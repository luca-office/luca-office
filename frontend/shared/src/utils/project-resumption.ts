import {ApolloClient} from "@apollo/client"
import {compact} from "lodash-es"
import {SurveyEventType} from "../graphql/generated/globalTypes"
import {
  SurveyInvitationAndEventsForResumptionQuery,
  SurveyInvitationAndEventsForResumptionQueryVariables
} from "../graphql/generated/SurveyInvitationAndEventsForResumptionQuery"
import {surveyInvitationAndEventsForResumptionQuery} from "../graphql/queries/survey-event"
import {
  EvaluateInterventionPayload,
  Intervention,
  InterventionWithTimeOffset,
  LocalEmail,
  ReceiveEmailPayload,
  SurveyEvent
} from "../models"
import {convertSurveyEvent} from "."

interface InitInterventionsConfig {
  readonly elapsedTimeOfProjectModuleForResumptionInSeconds: number
  readonly interventions: Intervention[]
  readonly delayInterventionEmail: (intervention: InterventionWithTimeOffset) => void
  readonly client: ApolloClient<object>
  readonly participantToken: string
  readonly setAreInterventionEmailsForProjectResumptionInitialized: (areInitialized: boolean) => void
}

export const initInterventionsForProjectResumption = async ({
  delayInterventionEmail,
  interventions,
  client,
  elapsedTimeOfProjectModuleForResumptionInSeconds,
  participantToken,
  setAreInterventionEmailsForProjectResumptionInitialized
}: InitInterventionsConfig) => {
  try {
    const {data} = await client.query<
      SurveyInvitationAndEventsForResumptionQuery,
      SurveyInvitationAndEventsForResumptionQueryVariables
    >({
      query: surveyInvitationAndEventsForResumptionQuery,
      variables: {
        token: participantToken
      }
    })

    const surveyEvents = (
      data.surveyInvitationAndEventsForResumption?.surveyEventsForLatestInProgressProjectModule?.surveyEvents ?? []
    ).map(convertSurveyEvent)

    const occurredInterventionIds = compact(
      (surveyEvents.filter(
        event => event.eventType === SurveyEventType.EvaluateIntervention && event.data !== null
      ) as SurveyEvent<EvaluateInterventionPayload>[]).map(event => event.data?.interventionId)
    )

    interventions
      .filter(
        intervention =>
          intervention.__typename !== "RuntimeSurveyAnswerSelectionIntervention" &&
          !occurredInterventionIds.includes(intervention.id)
      )
      .forEach(intervention => {
        if (intervention.__typename !== "RuntimeSurveyAnswerSelectionIntervention") {
          delayInterventionEmail({
            ...intervention,
            timeOffsetInSeconds: intervention.timeOffsetInSeconds - elapsedTimeOfProjectModuleForResumptionInSeconds
          })
        }
      })

    setAreInterventionEmailsForProjectResumptionInitialized(true)
  } catch (error) {
    setAreInterventionEmailsForProjectResumptionInitialized(false)
  }
}

interface InitEmailsConfig {
  readonly elapsedTimeOfProjectModuleForResumptionInSeconds: number
  readonly emailsWithoutInterventionEmails: LocalEmail[]
  readonly delayEmail: (mail: LocalEmail) => void
  readonly client: ApolloClient<object>
  readonly participantToken: string
  readonly setAreEmailsForProjectResumptionInitialized: (areInitialized: boolean) => void
}

export const initEmailsForProjectResumption = async ({
  delayEmail,
  emailsWithoutInterventionEmails,
  client,
  elapsedTimeOfProjectModuleForResumptionInSeconds,
  participantToken,
  setAreEmailsForProjectResumptionInitialized
}: InitEmailsConfig) => {
  try {
    const {data} = await client.query<
      SurveyInvitationAndEventsForResumptionQuery,
      SurveyInvitationAndEventsForResumptionQueryVariables
    >({
      query: surveyInvitationAndEventsForResumptionQuery,
      variables: {
        token: participantToken
      }
    })

    const surveyEvents = (
      data.surveyInvitationAndEventsForResumption?.surveyEventsForLatestInProgressProjectModule?.surveyEvents ?? []
    ).map(convertSurveyEvent)

    const receivedEmailIds = compact(
      (surveyEvents.filter(
        event => event.eventType === SurveyEventType.ReceiveEmail && event.data !== null
      ) as SurveyEvent<ReceiveEmailPayload>[]).map(event => event.data?.emailId)
    )

    // delay only the future mails, that are not already received and substract the elapsed time from reception delay
    emailsWithoutInterventionEmails
      .filter(email => !receivedEmailIds.includes(email.id) && email.receptionDelayInSeconds > 0)
      .forEach(email => {
        delayEmail({
          ...email,
          receptionDelayInSeconds: email.receptionDelayInSeconds - elapsedTimeOfProjectModuleForResumptionInSeconds
        })
      })

    setAreEmailsForProjectResumptionInitialized(true)
  } catch (error) {
    setAreEmailsForProjectResumptionInitialized(false)
  }
}
