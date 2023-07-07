import {useQuery} from "@apollo/client"
import {SurveyEvent} from "../../../../models"
import {convertSurveyEvent} from "../../../../utils"
import {SurveyEventsQuery, SurveyEventsQueryVariables} from "../../../generated/SurveyEventsQuery"
import {surveyEventsQuery} from "../../../queries/survey-event"

export interface UseSurveyEventsHook {
  readonly surveyEvents: SurveyEvent[]
  readonly surveyEventsLoading: boolean
}

interface UseSurveyEventsParams {
  readonly surveyInvitationId: UUID
  readonly scenarioId: UUID
  readonly pollingRateInMillis?: number
}

export const useSurveyEvents = ({
  surveyInvitationId,
  scenarioId,
  pollingRateInMillis
}: UseSurveyEventsParams): UseSurveyEventsHook => {
  const {data, loading} = useQuery<SurveyEventsQuery, SurveyEventsQueryVariables>(surveyEventsQuery, {
    variables: {surveyInvitationId, scenarioId},
    pollInterval: pollingRateInMillis
  })

  return {
    surveyEvents: data?.surveyEvents.map(surveyEvent => convertSurveyEvent(surveyEvent)) ?? [],
    surveyEventsLoading: loading
  }
}
