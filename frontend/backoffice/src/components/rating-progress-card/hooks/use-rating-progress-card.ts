import {useRatings, useSurveyUserAccounts} from "shared/graphql/hooks"
import {getRaterCounts} from "../utils"

export interface UseRatingProgressCardHook {
  readonly ratersInProgressCount: number
  readonly finishedRatersCount: number
}

export const useRatingProgressCard = (surveyId: UUID): UseRatingProgressCardHook => {
  const {ratings: allRatings} = useRatings(surveyId)
  const {surveyUserAccounts} = useSurveyUserAccounts(surveyId)

  return getRaterCounts(allRatings, surveyUserAccounts)
}
