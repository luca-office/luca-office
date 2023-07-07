import {isEqual} from "lodash-es"
import * as React from "react"
import {RaterMode} from "../../../enums"
import {ProjectModule, Rating, UserAccount} from "../../../models"
import {find, isDefined, Option} from "../../../utils"
import {useRatings} from "./use-ratings"

export interface UseRatingHook {
  readonly isContentMissing: boolean
  readonly ratingsLoading: boolean
  readonly ratingId: Option<UUID>
  readonly rating: Option<Rating>
  readonly isReadonly: boolean
}

interface UseRatingParams {
  readonly surveyId: UUID
  readonly mode: RaterMode
  readonly projectModulesLoading: boolean
  readonly projectModule: Option<ProjectModule>
  readonly userAccount: Option<UserAccount>
  readonly raterId?: UUID
  readonly disabled: boolean
}

export const useRating = ({
  surveyId,
  mode,
  projectModulesLoading,
  projectModule,
  userAccount,
  raterId,
  disabled
}: UseRatingParams): UseRatingHook => {
  const ratingIdRef = React.useRef<UUID | null>()

  const {ratings, ratingsLoading} = useRatings(surveyId, mode, raterId)

  const rating =
    raterId !== undefined
      ? find(rating => rating.userAccountId === raterId, ratings)
      : userAccount.flatMap(user => find(rating => rating.userAccountId === user.id, ratings))
  const ratingId = rating.map(rating => rating.id)
  const isReadonly = disabled || rating.map(({finalizedAt}) => isDefined(finalizedAt)).getOrElse(false)

  if (!isEqual(ratingIdRef.current, ratingId.orNull())) {
    ratingIdRef.current = ratingId.orNull()
  }

  const isContentMissing = (!projectModulesLoading && projectModule.isEmpty()) || (!ratingsLoading && rating.isEmpty())

  return {isContentMissing, ratingsLoading, ratingId, rating, isReadonly}
}
