import {useApolloClient} from "@apollo/client"
import * as React from "react"
import {
  ScenarioCodingItemRatingsQuery,
  ScenarioCodingItemRatingsQueryVariables
} from "../../../graphql/generated/ScenarioCodingItemRatingsQuery"
import {scenarioCodingItemRatingsQuery} from "../../../graphql/queries"
import {Rating, ScenarioCodingItemRating} from "../../../models"

export interface UseScenarioCodingItemRatingsByRatingsListHook {
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly scenarioCodingItemRatingsLoading: boolean
  readonly getScenarioCodingItemRatings: (ratings: Rating[]) => void
}

export const useScenarioCodingItemRatingsByRatingsList = (): UseScenarioCodingItemRatingsByRatingsListHook => {
  const client = useApolloClient()

  const isMounted = React.useRef(false)

  const [scenarioCodingItemRatingsLoading, setScenarioCodingItemRatingsLoading] = React.useState<boolean>(false)
  const [scenarioCodingItemRatings, setScenarioCodingItemRatings] = React.useState<ScenarioCodingItemRating[]>([])

  const getScenarioCodingItemRatings = (ratings: Rating[]) => {
    setScenarioCodingItemRatingsLoading(true)
    Promise.all(
      ratings.map(rating =>
        client.query<ScenarioCodingItemRatingsQuery, ScenarioCodingItemRatingsQueryVariables>({
          query: scenarioCodingItemRatingsQuery,
          variables: {ratingId: rating.id}
        })
      )
    )
      .then(results =>
        results.reduce(
          (accumulator, result) => [...accumulator, ...(result.data?.scenarioCodingItemRatings ?? [])],
          [] as ScenarioCodingItemRating[]
        )
      )
      .then(scenarioRatings => {
        if (isMounted.current) {
          setScenarioCodingItemRatings(scenarioRatings)
          setScenarioCodingItemRatingsLoading(false)
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setScenarioCodingItemRatings([])
          setScenarioCodingItemRatingsLoading(false)
        }
      })
  }

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {scenarioCodingItemRatings, scenarioCodingItemRatingsLoading, getScenarioCodingItemRatings}
}
