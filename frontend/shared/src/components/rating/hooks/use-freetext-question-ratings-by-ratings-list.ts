import {useApolloClient} from "@apollo/client"
import {FetchPolicy} from "@apollo/client/core/watchQueryOptions"
import * as React from "react"
import {
  FreetextQuestionRatingsQuery,
  FreetextQuestionRatingsQueryVariables
} from "../../../graphql/generated/FreetextQuestionRatingsQuery"
import {freetextQuestionRatingsQuery} from "../../../graphql/queries"
import {FreetextQuestionRating, Rating} from "../../../models"

export interface UseFreetextQuestionRatingsByRatingsListHook {
  readonly freetextQuestionRatings: FreetextQuestionRating[]
  readonly freetextQuestionRatingsLoading: boolean
  readonly getFreetextQuestionRatings: (
    ratings: Rating[],
    fetchPolicy?: FetchPolicy
  ) => Promise<FreetextQuestionRating[]>
}

export const useFreetextQuestionRatingsByRatingsList = (): UseFreetextQuestionRatingsByRatingsListHook => {
  const client = useApolloClient()

  const isMounted = React.useRef(false)

  const [freetextQuestionRatingsLoading, setFreetextQuestionRatingsLoading] = React.useState<boolean>(false)
  const [freetextQuestionRatings, setFreetextQuestionRatings] = React.useState<FreetextQuestionRating[]>([])

  const getFreetextQuestionRatings = (ratings: Rating[], fetchPolicy?: FetchPolicy) => {
    setFreetextQuestionRatingsLoading(true)
    return new Promise<FreetextQuestionRating[]>((resolve, reject) =>
      Promise.all(
        ratings.map(rating =>
          client.query<FreetextQuestionRatingsQuery, FreetextQuestionRatingsQueryVariables>({
            query: freetextQuestionRatingsQuery,
            variables: {ratingId: rating.id},
            fetchPolicy
          })
        )
      )
        .then(results =>
          results.reduce(
            (accumulator, result) => [...accumulator, ...(result.data?.freetextQuestionRatings ?? [])],
            [] as FreetextQuestionRating[]
          )
        )
        .then(scenarioRatings => {
          if (isMounted.current) {
            setFreetextQuestionRatings(scenarioRatings)
            setFreetextQuestionRatingsLoading(false)
          }
          resolve(scenarioRatings)
        })
        .catch(error => {
          if (isMounted.current) {
            setFreetextQuestionRatings([])
            setFreetextQuestionRatingsLoading(false)
          }
          reject(error)
        })
    )
  }

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {freetextQuestionRatings, freetextQuestionRatingsLoading, getFreetextQuestionRatings}
}
