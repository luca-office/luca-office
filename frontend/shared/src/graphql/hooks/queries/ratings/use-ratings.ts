import {useQuery} from "@apollo/client"
import {Rating} from "../../../../models"
import {RatingsQuery, RatingsQueryVariables} from "../../../generated/RatingsQuery"
import {ratingsQuery} from "../../../queries"

export interface UseRatingsHook {
  readonly ratings: Rating[]
  readonly ratingsLoading: boolean
}

export const useRatings = (surveyId: UUID): UseRatingsHook => {
  const {data, loading} = useQuery<RatingsQuery, RatingsQueryVariables>(ratingsQuery, {variables: {surveyId}})
  return {ratings: data?.ratings ?? [], ratingsLoading: loading}
}
