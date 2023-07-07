import {isEqual} from "lodash-es"
import * as React from "react"
import {RaterMode} from "../../../enums"
import {useCheckLogin, useRatings as useRatingsHook} from "../../../graphql/hooks"
import {Rating, UserAccount} from "../../../models"

export interface UseRatingsHook {
  readonly ratingsLoading: boolean
  readonly ratings: Rating[]
  readonly allRatings: Rating[]
}

export const useRatings = (surveyId: UUID, mode: RaterMode, raterId?: UUID): UseRatingsHook => {
  const allRatingsRef = React.useRef<Rating[]>([])
  const accountRef = React.useRef<UserAccount | null>(null)

  const {account} = useCheckLogin(raterId !== undefined)
  const {ratings: allRatings, ratingsLoading} = useRatingsHook(surveyId)

  if (!isEqual(accountRef.current, account.orNull())) {
    accountRef.current = account.orNull()
  }

  if (!isEqual(allRatingsRef.current, allRatings)) {
    allRatingsRef.current = allRatings
  }

  const ratings = React.useMemo(
    () =>
      allRatingsRef.current.filter(
        rating =>
          (raterId !== undefined
            ? rating.userAccountId === raterId
            : rating.userAccountId === accountRef.current?.id) &&
          (mode === RaterMode.FinalRater ? rating.isFinalScore : !rating.isFinalScore)
      ),
    [allRatingsRef.current, accountRef.current, raterId, mode]
  )

  return {ratings, ratingsLoading, allRatings}
}
