import {useQuery} from "@apollo/client"
import {FreetextQuestionRating} from "../../../../models"
import {
  FreetextQuestionRatingsQuery,
  FreetextQuestionRatingsQueryVariables
} from "../../../generated/FreetextQuestionRatingsQuery"
import {freetextQuestionRatingsQuery} from "../../../queries"

export interface UseFreetextQuestionRatingsHook {
  readonly freetextQuestionRatings: FreetextQuestionRating[]
  readonly freetextQuestionRatingsLoading: boolean
}

export const useFreetextQuestionRatings = (ratingId: UUID): UseFreetextQuestionRatingsHook => {
  const {data, loading} = useQuery<FreetextQuestionRatingsQuery, FreetextQuestionRatingsQueryVariables>(
    freetextQuestionRatingsQuery,
    {variables: {ratingId}}
  )

  return {
    freetextQuestionRatings: data?.freetextQuestionRatings ?? [],
    freetextQuestionRatingsLoading: loading
  }
}
