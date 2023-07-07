import {useQuery} from "@apollo/client"
import {ScenarioSurveyResultsForParticipant} from "../../../../models"
import {Option} from "../../../../utils"
import {
  ScenarioSurveyResultsForParticipantQuery,
  ScenarioSurveyResultsForParticipantQueryVariables
} from "../../../generated/ScenarioSurveyResultsForParticipantQuery"
import {scenarioSurveyResultsForParticipantQuery} from "../../../queries"

export interface UseScenarioSurveyResultsForParticipantHook {
  readonly scenarioSurveyResultsForParticipant: Option<ScenarioSurveyResultsForParticipant>
  readonly scenarioSurveyResultsForParticipantLoading: boolean
}

export const useScenarioSurveyResultsForParticipant = (
  scenarioId: UUID,
  surveyId: UUID,
  surveyInvitationId: UUID
): UseScenarioSurveyResultsForParticipantHook => {
  const {data, loading} = useQuery<
    ScenarioSurveyResultsForParticipantQuery,
    ScenarioSurveyResultsForParticipantQueryVariables
  >(scenarioSurveyResultsForParticipantQuery, {
    variables: {scenarioId, surveyId, surveyInvitationId}
  })

  return {
    scenarioSurveyResultsForParticipant: Option.of(data?.scenarioSurveyResultsForParticipant),
    scenarioSurveyResultsForParticipantLoading: loading
  }
}
