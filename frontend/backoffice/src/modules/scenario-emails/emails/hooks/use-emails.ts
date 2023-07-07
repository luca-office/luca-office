import * as React from "react"
import {useDispatch} from "react-redux"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {useEmails as useEmailsQuery, useInterventions, useScenario} from "shared/graphql/hooks"
import {Email, Intervention, Scenario} from "shared/models"
import {getFilteredEmailsByDirectory, Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"
import {createEmailsSortFn} from "../../utils/directory"

export interface UseEmailsHook {
  readonly actionsDisabled: boolean
  readonly emails: Email[]
  readonly emailsLoading: boolean
  readonly introductionEmail: Option<Email>
  readonly interventions: Intervention[]
  readonly scenario: Option<Scenario>
  readonly scenarioLoading: boolean
  readonly selectDirectory: (directory: EmailDirectory) => void
  readonly selectedDirectory: EmailDirectory
  readonly selectedEmailId: Option<UUID>
  readonly selectEmail: (email: Email) => void
}

interface UseEmailsParams {
  readonly scenarioId: UUID
  readonly selectedDirectory: EmailDirectory
  readonly selectedEmailId?: UUID
}

export const useEmails = ({scenarioId, selectedDirectory, selectedEmailId}: UseEmailsParams): UseEmailsHook => {
  const dispatch = useDispatch()
  const {scenario, scenarioLoading} = useScenario(scenarioId)
  const {emails, emailsLoading} = useEmailsQuery(scenarioId)
  const {interventions, interventionsLoading} = useInterventions(scenarioId)

  const navigateToEmail = (directory: EmailDirectory, emailId?: UUID) => {
    dispatch(
      navigateToRouteAction(Route.ScenarioEmails, {
        scenarioId,
        emailId,
        directory
      })
    )
  }

  const getIntroductionMail = (): Option<Email> => {
    const introId = scenario.map(scenarioValue => scenarioValue.introductionEmailId).orNull()

    return Option.of(introId ? emails.map(mails => mails.find(mail => mail.id === introId)).orNull() : null)
  }

  const filteredEmails = React.useMemo<Email[]>(() => {
    const introId = scenario.map(scenarioValue => scenarioValue.introductionEmailId).orNull()
    return emails
      .map(mails => getFilteredEmailsByDirectory(selectedDirectory, mails))
      .getOrElse([])
      .sort(createEmailsSortFn(selectedDirectory, introId))
  }, [emails, selectedDirectory])

  //if email is selected and it is not displayed (cause it's dir is different) --> navigate
  React.useEffect(() => {
    if (selectedEmailId && !emailsLoading) {
      const email = emails.getOrElse([]).find(mail => mail.id === selectedEmailId)

      if (email && selectedDirectory !== email.directory) {
        selectEmail(email)
      }
    }
  }, [emailsLoading])

  const selectEmail = (email: Email) => {
    navigateToEmail(email.directory, email.id)
  }
  const selectDirectory = (directory: EmailDirectory) => {
    const emailForDir = emails.getOrElse([]).find(email => email.directory === directory)
    navigateToEmail(directory, emailForDir?.id)
  }

  return {
    actionsDisabled: scenario.map(data => !!data.finalizedAt || !!data.publishedAt).getOrElse(true),
    scenario,
    scenarioLoading,
    emails: filteredEmails,
    emailsLoading: emailsLoading || interventionsLoading,
    interventions: interventions.getOrElse([]),
    selectedEmailId: Option.of(selectedEmailId),
    selectEmail,
    introductionEmail: getIntroductionMail(),
    selectedDirectory,
    selectDirectory
  }
}
