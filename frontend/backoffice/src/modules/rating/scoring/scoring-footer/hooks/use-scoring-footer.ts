import {useSurveyResultsOverview} from "shared/graphql/hooks"
import {Rating, UserAccount} from "shared/models"
import {find, isDefined} from "shared/utils"

export interface UseScoringFooterHook {
  readonly participantsFullyRatedCount: number
  readonly completedRatingsCount: number
}

export const useScoringFooter = (raters: UserAccount[], ratings: Rating[], surveyId: UUID): UseScoringFooterHook => {
  const {surveyResultsOverview} = useSurveyResultsOverview(surveyId, undefined, undefined, "network-only")

  const participantsFullyRatedCount = surveyResultsOverview
    .map(results => results.participantResults.filter(result => result.isComplete).length)
    .getOrElse(0)

  const completedRatingsCount = raters.reduce(
    (accumulator, rater) =>
      find(rating => rating.userAccountId === rater.id && isDefined(rating.finalizedAt), ratings)
        .map(() => accumulator + 1)
        .getOrElse(accumulator),
    0
  )

  return {participantsFullyRatedCount, completedRatingsCount}
}
