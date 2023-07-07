import {useApolloClient} from "@apollo/client"
import {FetchPolicy} from "@apollo/client/core/watchQueryOptions"
import * as React from "react"
import {
  ScenarioCodingItemRatingsQuery,
  ScenarioCodingItemRatingsQueryVariables
} from "../../../graphql/generated/ScenarioCodingItemRatingsQuery"
import {scenarioCodingItemRatingsQuery} from "../../../graphql/queries"
import {Rating, ScenarioCodingItemRating} from "../../../models"

export interface UseScenarioCodingItemsByRatingsListHook {
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly scenarioCodingItemRatingsLoading: boolean
  readonly getScenarioCodingItemRatings: (
    ratings: Rating[],
    fetchPolicy?: FetchPolicy
  ) => Promise<ScenarioCodingItemRating[]>
}

export const useScenarioCodingItemsByRatingsList = (): UseScenarioCodingItemsByRatingsListHook => {
  const client = useApolloClient()

  const [scenarioCodingItemRatingsLoading, setScenarioCodingItemRatingsLoading] = React.useState(false)
  const [scenarioCodingItemRatings, setScenarioCodingItemRatings] = React.useState<ScenarioCodingItemRating[]>([])

  const getScenarioCodingItemRatings = (ratings: Rating[], fetchPolicy?: FetchPolicy) => {
    setScenarioCodingItemRatingsLoading(true)
    return new Promise<ScenarioCodingItemRating[]>((resolve, reject) => {
      Promise.all(
        ratings.map(rating =>
          client.query<ScenarioCodingItemRatingsQuery, ScenarioCodingItemRatingsQueryVariables>({
            query: scenarioCodingItemRatingsQuery,
            variables: {ratingId: rating.id},
            fetchPolicy
          })
        )
      )
        .then(results =>
          results.reduce(
            (accumulator, result) => [...accumulator, ...(result.data?.scenarioCodingItemRatings ?? [])],
            [] as ScenarioCodingItemRating[]
          )
        )
        .then(result => {
          setScenarioCodingItemRatings(result)
          setScenarioCodingItemRatingsLoading(false)
          resolve(result)
        })
        .catch(error => {
          setScenarioCodingItemRatings([])
          setScenarioCodingItemRatingsLoading(false)
          reject(error)
        })
    })
  }

  return {scenarioCodingItemRatings, scenarioCodingItemRatingsLoading, getScenarioCodingItemRatings}
}
