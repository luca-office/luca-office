import {ApolloClient} from "@apollo/client"
import {differenceInSeconds} from "date-fns"
import {EmailsQuery, EmailsQueryVariables} from "shared/graphql/generated/EmailsQuery"
import {
  FilesForSampleCompanyQuery,
  FilesForSampleCompanyQueryVariables,
  FilesForSampleCompanyQuery_filesForSampleCompany
} from "shared/graphql/generated/FilesForSampleCompanyQuery"
import {FilesForScenarioQuery, FilesForScenarioQueryVariables} from "shared/graphql/generated/FilesForScenarioQuery"
import {InterventionsQuery, InterventionsQueryVariables} from "shared/graphql/generated/InterventionsQuery"
import {ScenarioQuery, ScenarioQueryVariables} from "shared/graphql/generated/ScenarioQuery"
import {emailsQuery, filesForSampleCompanyQuery, filesForScenarioQuery, scenarioQuery} from "shared/graphql/queries"
import {interventionsQuery} from "shared/graphql/queries/interventions"
import {ParticipantData, Spreadsheet} from "shared/models"
import {setEmailsAction} from "shared/redux/actions"
import {emailsReducer} from "shared/redux/reducers/data/emails-reducer"
import {SharedAppState} from "shared/redux/state"
import {EmailsState, initialSpreadsheetState, SpreadsheetState} from "shared/redux/state/data"
import {now, Option, remoteToLocalEmail, toLocalSpreadsheet} from "shared/utils"

interface InitEmailsStateConfig {
  readonly client: ApolloClient<object>
  readonly scenarioId: UUID
  readonly appState: SharedAppState
  readonly elapsedTimeOfProjectModuleForResumptionInSeconds: number
  readonly scenarioFirstStartedAt: Date
}

export const initEmailsState = async ({
  client,
  scenarioId,
  appState,
  scenarioFirstStartedAt,
  elapsedTimeOfProjectModuleForResumptionInSeconds
}: InitEmailsStateConfig): Promise<EmailsState> => {
  const {data} = await client.query<EmailsQuery, EmailsQueryVariables>({
    query: emailsQuery,
    variables: {
      scenarioId
    }
  })

  const {data: interventionsData} = await client.query<InterventionsQuery, InterventionsQueryVariables>({
    query: interventionsQuery,
    variables: {
      scenarioId
    }
  })

  const interventionEmailIds = interventionsData.interventions.map(intervention => intervention.interventionEmailId)

  const differenceBetweenScenarioFirstStartAndNow = Math.abs(differenceInSeconds(scenarioFirstStartedAt, now()))

  const localMailsWithRecipientAndSender = data.emails.map(remoteToLocalEmail)

  const emailsWithoutInterventionEmails = localMailsWithRecipientAndSender.filter(
    email => !interventionEmailIds.includes(email.id)
  )

  // emails that are always visible from beginning on. No Intervention Emails or Emails with delay. They should always be visible, but with adjusted reception delay
  const initialVisibleEmails = emailsWithoutInterventionEmails
    .filter(email => email.receptionDelayInSeconds <= 0)
    .map(email => ({
      ...email,
      isVisible: true,
      receptionDelayInSeconds: email.receptionDelayInSeconds - differenceBetweenScenarioFirstStartAndNow
    }))

  // set delayed or interventions mail to isVisible = false, so the reducer can make them visible and adjust delay, if ReceiveEvent was sent.
  const emailsWithDelayOrInterventionEmails = localMailsWithRecipientAndSender
    .filter(email => email.receptionDelayInSeconds > 0 || interventionEmailIds.includes(email.id))
    .map(email => ({
      ...email,
      isVisible: false
    }))

  const emailsState = emailsReducer(
    appState.data.emails,
    setEmailsAction([...initialVisibleEmails, ...emailsWithDelayOrInterventionEmails])
  )

  return emailsState
}

interface InitSpreadsheetStateConfig {
  readonly client: ApolloClient<object>
  readonly scenarioId: UUID
}

export const initSpreadsheetsState = async ({
  client,
  scenarioId
}: InitSpreadsheetStateConfig): Promise<SpreadsheetState> => {
  const {data: scenarioFilesData} = await client.query<FilesForScenarioQuery, FilesForScenarioQueryVariables>({
    query: filesForScenarioQuery,
    variables: {
      scenarioId
    }
  })

  const {data: scenarioData} = await client.query<ScenarioQuery, ScenarioQueryVariables>({
    query: scenarioQuery,
    variables: {id: scenarioId}
  })

  let sampleCompanyFiles: Array<FilesForSampleCompanyQuery_filesForSampleCompany> = []

  if (scenarioData.scenario?.sampleCompanyId) {
    const {data: sampleCompanyData} = await client.query<
      FilesForSampleCompanyQuery,
      FilesForSampleCompanyQueryVariables
    >({
      query: filesForSampleCompanyQuery,
      variables: {sampleCompanyId: scenarioData.scenario.sampleCompanyId}
    })

    sampleCompanyFiles = sampleCompanyData.filesForSampleCompany
  }

  const spreadsheets: Array<Spreadsheet> = [...scenarioFilesData.filesForScenario, ...sampleCompanyFiles]
    .filter(file => file.spreadsheet !== null)
    .map(file => file.spreadsheet!)

  const localSpreadsheets: SpreadsheetState = spreadsheets.reduce((map, sheet) => {
    map[sheet.id] = toLocalSpreadsheet(sheet)
    return map
  }, initialSpreadsheetState)

  return localSpreadsheets
}
