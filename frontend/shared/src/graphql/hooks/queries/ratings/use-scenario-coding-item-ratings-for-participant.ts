import {useQuery} from "@apollo/client"
import {ScenarioCodingItemRating} from "../../../../models"
import {
  ScenarioCodingItemRatingsForParticipantQuery,
  ScenarioCodingItemRatingsForParticipantQueryVariables
} from "../../../generated/ScenarioCodingItemRatingsForParticipantQuery"
import {scenarioCodingItemRatingsForParticipantQuery} from "../../../queries"

export interface UseScenarioCodingItemRatingsForParticipantHook {
  readonly scenarioCodingItemRatingsForParticipant: ScenarioCodingItemRating[]
  readonly scenarioCodingItemRatingsForParticipantLoading: boolean
}

export const useScenarioCodingItemRatingsForParticipant = (
  scenarioId: UUID,
  surveyInvitationId: UUID
): UseScenarioCodingItemRatingsForParticipantHook => {
  const {data, loading} = useQuery<
    ScenarioCodingItemRatingsForParticipantQuery,
    ScenarioCodingItemRatingsForParticipantQueryVariables
  >(scenarioCodingItemRatingsForParticipantQuery, {
    variables: {scenarioId, surveyInvitationId}
  })

  return {
    scenarioCodingItemRatingsForParticipant: data?.scenarioCodingItemRatingsForParticipant ?? [],
    scenarioCodingItemRatingsForParticipantLoading: loading
  }
}
