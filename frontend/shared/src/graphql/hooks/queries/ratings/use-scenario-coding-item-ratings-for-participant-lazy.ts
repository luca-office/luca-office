import {useApolloClient} from "@apollo/client"
import {FetchPolicy} from "@apollo/client/core/watchQueryOptions"
import * as React from "react"
import {ScenarioCodingItemRating} from "../../../../models"
import {
  ScenarioCodingItemRatingsForParticipantQuery,
  ScenarioCodingItemRatingsForParticipantQueryVariables
} from "../../../generated/ScenarioCodingItemRatingsForParticipantQuery"
import {scenarioCodingItemRatingsForParticipantQuery} from "../../../queries"

interface GetScenarioCodingItemRatingsForParticipantParams {
  readonly scenarioId: UUID
  readonly surveyInvitationId: UUID
  readonly fetchPolicy?: FetchPolicy
}

export interface UseScenarioCodingItemRatingsForParticipantLazyHook {
  readonly scenarioCodingItemRatingsForParticipant: ScenarioCodingItemRating[]
  readonly scenarioCodingItemRatingsForParticipantLoading: boolean
  readonly getScenarioCodingItemRatingsForParticipant: (
    params: GetScenarioCodingItemRatingsForParticipantParams
  ) => void
}

export const useScenarioCodingItemRatingsForParticipantLazy = (): UseScenarioCodingItemRatingsForParticipantLazyHook => {
  const client = useApolloClient()

  const [
    scenarioCodingItemRatingsForParticipantLoading,
    setScenarioCodingItemRatingsForParticipantLoading
  ] = React.useState(false)
  const [scenarioCodingItemRatingsForParticipant, setScenarioCodingItemRatingsForParticipant] = React.useState<
    ScenarioCodingItemRating[]
  >([])

  const getScenarioCodingItemRatingsForParticipant = ({
    scenarioId,
    surveyInvitationId,
    fetchPolicy
  }: GetScenarioCodingItemRatingsForParticipantParams) => {
    setScenarioCodingItemRatingsForParticipantLoading(true)
    client
      .query<ScenarioCodingItemRatingsForParticipantQuery, ScenarioCodingItemRatingsForParticipantQueryVariables>({
        query: scenarioCodingItemRatingsForParticipantQuery,
        variables: {scenarioId, surveyInvitationId},
        fetchPolicy
      })
      .then(result => {
        setScenarioCodingItemRatingsForParticipant(result.data?.scenarioCodingItemRatingsForParticipant ?? [])
        setScenarioCodingItemRatingsForParticipantLoading(false)
      })
      .catch(() => {
        setScenarioCodingItemRatingsForParticipant([])
        setScenarioCodingItemRatingsForParticipantLoading(false)
      })
  }

  return {
    scenarioCodingItemRatingsForParticipant,
    scenarioCodingItemRatingsForParticipantLoading,
    getScenarioCodingItemRatingsForParticipant
  }
}
