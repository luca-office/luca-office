import {useRatings} from "shared/graphql/hooks"
import {Rating} from "shared/models"
import {find, Option} from "shared/utils"

export interface UseRatingHook {
  readonly rating: Option<Rating>
  readonly ratingLoading: boolean
}

export const useRating = (surveyId: UUID, userAccountId: UUID): UseRatingHook => {
  const {ratings, ratingsLoading} = useRatings(surveyId)

  const rating = find(rating => rating.userAccountId === userAccountId, ratings)

  return {rating, ratingLoading: ratingsLoading}
}
