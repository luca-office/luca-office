import {useQuery} from "@apollo/client"
import {Rating} from "../../../../models"
import {Option} from "../../../../utils"
import {RatingQuery, RatingQueryVariables} from "../../../generated/RatingQuery"
import {ratingQuery} from "../../../queries"

export interface UseRatingHook {
  readonly rating: Option<Rating>
  readonly ratingLoading: boolean
}

export const useRating = (ratingId: UUID): UseRatingHook => {
  const {data, loading} = useQuery<RatingQuery, RatingQueryVariables>(ratingQuery, {variables: {id: ratingId}})
  return {rating: Option.of(data?.rating), ratingLoading: loading}
}
