import {Rating, UserAccount} from "shared/models"
import {exists, isDefined} from "shared/utils"

export interface RaterCounts {
  readonly ratersInProgressCount: number
  readonly finishedRatersCount: number
  readonly ratings: Rating[]
}

interface RatingsByRater {
  readonly [raterId: string]: Rating[]
}

export const getRaterCounts = (allRatings: Rating[], raters: UserAccount[]): RaterCounts => {
  const ratings = allRatings.filter(rating => !rating.isFinalScore)
  const ratingsByRaters = ratings.reduce(
    (accumulator, rating) => ({
      ...accumulator,
      [rating.userAccountId]: [...(accumulator[rating.userAccountId] ?? []), rating]
    }),
    {} as RatingsByRater
  )

  const ratersCount = raters.length
  const finishedRatersCount = Object.keys(ratingsByRaters).filter(raterId =>
    exists(rating => isDefined(rating.finalizedAt), ratingsByRaters[raterId] ?? [])
  ).length
  const ratersInProgressCount = ratersCount - finishedRatersCount

  return {ratersInProgressCount, finishedRatersCount, ratings}
}
