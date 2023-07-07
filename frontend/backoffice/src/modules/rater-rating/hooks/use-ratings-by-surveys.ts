import {useApolloClient} from "@apollo/client"
import * as React from "react"
import {RatingsQuery, RatingsQueryVariables} from "shared/graphql/generated/RatingsQuery"
import {ratingsQuery} from "shared/graphql/queries"
import {Rating, Survey} from "shared/models"
import {flatten} from "shared/utils"

export interface UseRatingsBySurveysHook {
  readonly ratingsLoading: boolean
  readonly ratings: Rating[]
  readonly getRatings: (surveys: Survey[]) => Promise<Rating[]>
}

export const useRatingsBySurveys = (): UseRatingsBySurveysHook => {
  const client = useApolloClient()

  const [ratingsLoading, setRatingsLoading] = React.useState(false)
  const [ratings, setRatings] = React.useState<Rating[]>([])

  const getRatings = (surveys: Survey[]) =>
    new Promise<Rating[]>((resolve, reject) => {
      setRatingsLoading(true)
      Promise.all(
        surveys.map(survey =>
          client.query<RatingsQuery, RatingsQueryVariables>({
            query: ratingsQuery,
            variables: {surveyId: survey.id}
          })
        )
      )
        .then(results => {
          const allRatings = flatten(results.map(result => result.data?.ratings ?? []))
          setRatingsLoading(false)
          setRatings(allRatings)
          resolve(allRatings)
        })
        .catch(error => {
          setRatingsLoading(false)
          setRatings([])
          reject(error)
        })
    })

  return {ratingsLoading, ratings, getRatings}
}
