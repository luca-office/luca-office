import {useQuery} from "@apollo/client"
import {SurveyEvent} from "../../../../models"
import {convertSurveyEvent} from "../../../../utils"
import {
  SurveyEventsForSurveyQuery,
  SurveyEventsForSurveyQueryVariables
} from "../../../generated/SurveyEventsForSurveyQuery"
import {surveyEventsForSurveyQuery} from "../../../queries/survey-event"

export interface UseSurveyEventsForSurveyHook {
  readonly surveyEvents: SurveyEvent[]
  readonly surveyEventsLoading: boolean
}

interface UseSurveyEventsParams {
  readonly surveyId: UUID
  readonly scenarioId: UUID
}

export const useSurveyEventsForSurvey = ({
  surveyId,
  scenarioId
}: UseSurveyEventsParams): UseSurveyEventsForSurveyHook => {
  const {data, loading} = useQuery<SurveyEventsForSurveyQuery, SurveyEventsForSurveyQueryVariables>(
    surveyEventsForSurveyQuery,
    {
      variables: {surveyId, scenarioId}
    }
  )

  return {
    surveyEvents: data?.surveyEventsForSurvey.map(convertSurveyEvent) ?? [],
    surveyEventsLoading: loading
  }
}
