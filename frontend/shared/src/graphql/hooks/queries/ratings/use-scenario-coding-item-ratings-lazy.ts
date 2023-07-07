import {useApolloClient} from "@apollo/client"
import {FetchPolicy} from "@apollo/client/core/watchQueryOptions"
import * as React from "react"
import {ScenarioCodingItemRating} from "../../../../models"
import {
  ScenarioCodingItemRatingsQuery,
  ScenarioCodingItemRatingsQueryVariables
} from "../../../generated/ScenarioCodingItemRatingsQuery"
import {scenarioCodingItemRatingsQuery} from "../../../queries"

export interface UseScenarioCodingItemRatingsLazyHook {
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly scenarioCodingItemRatingsLoading: boolean
  readonly getScenarioCodingItemRatings: (
    ratingId: UUID,
    fetchPolicy?: FetchPolicy
  ) => Promise<ScenarioCodingItemRating[]>
}

export const useScenarioCodingItemRatingsLazy = (): UseScenarioCodingItemRatingsLazyHook => {
  const client = useApolloClient()

  const [scenarioCodingItemRatingsLoading, setScenarioCodingItemRatingsLoading] = React.useState(false)
  const [scenarioCodingItemRatings, setScenarioCodingItemRatings] = React.useState<ScenarioCodingItemRating[]>([])

  const getScenarioCodingItemRatings = (ratingId: UUID, fetchPolicy?: FetchPolicy) => {
    setScenarioCodingItemRatingsLoading(true)
    return new Promise<ScenarioCodingItemRating[]>((resolve, reject) =>
      client
        .query<ScenarioCodingItemRatingsQuery, ScenarioCodingItemRatingsQueryVariables>({
          query: scenarioCodingItemRatingsQuery,
          variables: {ratingId},
          fetchPolicy
        })
        .then(result => {
          const ratings = result.data?.scenarioCodingItemRatings ?? []
          setScenarioCodingItemRatings(ratings)
          setScenarioCodingItemRatingsLoading(false)
          resolve(ratings)
        })
        .catch(error => {
          setScenarioCodingItemRatings([])
          setScenarioCodingItemRatingsLoading(false)
          reject(error)
        })
    )
  }

  return {scenarioCodingItemRatings, scenarioCodingItemRatingsLoading, getScenarioCodingItemRatings}
}
