import {useQuery} from "@apollo/client"
import {ScenarioSurveyResultsForParticipant} from "../../../../models"
import {
  ScenarioSurveyResultsForParticipantsQuery,
  ScenarioSurveyResultsForParticipantsQueryVariables
} from "../../../generated/ScenarioSurveyResultsForParticipantsQuery"
import {scenarioSurveyResultsForParticipantsQuery} from "../../../queries"

export interface UseScenarioSurveyResultsForParticipantsHook {
  readonly scenarioSurveyResultsForParticipants: ScenarioSurveyResultsForParticipant[]
  readonly scenarioSurveyResultsForParticipantsLoading: boolean
}

export const useScenarioSurveyResultsForParticipants = (
  scenarioId: UUID,
  surveyId: UUID
): UseScenarioSurveyResultsForParticipantsHook => {
  const {data, loading} = useQuery<
    ScenarioSurveyResultsForParticipantsQuery,
    ScenarioSurveyResultsForParticipantsQueryVariables
  >(scenarioSurveyResultsForParticipantsQuery, {
    variables: {scenarioId, surveyId}
  })

  return {
    scenarioSurveyResultsForParticipants: data?.scenarioSurveyResultsForParticipants ?? [],
    scenarioSurveyResultsForParticipantsLoading: loading
  }
}
