import {useQuery} from "@apollo/client"
import {ScenarioCodingItemRating} from "../../../../models"
import {
  ScenarioCodingItemRatingsQuery,
  ScenarioCodingItemRatingsQueryVariables
} from "../../../generated/ScenarioCodingItemRatingsQuery"
import {scenarioCodingItemRatingsQuery} from "../../../queries"

export interface UseScenarioCodingItemRatingsHook {
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly scenarioCodingItemRatingsLoading: boolean
}

export const useScenarioCodingItemRatings = (ratingId: UUID): UseScenarioCodingItemRatingsHook => {
  const {data, loading} = useQuery<ScenarioCodingItemRatingsQuery, ScenarioCodingItemRatingsQueryVariables>(
    scenarioCodingItemRatingsQuery,
    {
      variables: {ratingId}
    }
  )

  return {
    scenarioCodingItemRatings: data?.scenarioCodingItemRatings ?? [],
    scenarioCodingItemRatingsLoading: loading
  }
}
