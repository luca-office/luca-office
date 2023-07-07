import {sum} from "lodash-es"
import {
  AutomatedCodingCriterion,
  CodingCriterion,
  CodingItem,
  Rating,
  ScenarioCodingItemRating,
  ScenarioRatingCriterionSelection
} from "../../../models"
import {every, find, isAutomatedCodingCriterion, some} from "../../../utils"
import {isDefined} from "../../../utils/common"
import {wasCodingCriterionRated} from "./coding-criterion"

export const getMaxScoreOfAllCodingItems = (codingItems: CodingItem[]): number => {
  const maxScores = codingItems.map(({maximumScore}) => maximumScore)
  return sum(maxScores)
}

interface HasCodingItemBeenRatedParams {
  readonly codingItem: CodingItem
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly codingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
  readonly criterionSelections: Array<ScenarioRatingCriterionSelection>
}

export const hasCodingItemBeenRated = ({
  codingItem,
  scenarioCodingItemRatings,
  codingCriteria,
  criterionSelections
}: HasCodingItemBeenRatedParams) => {
  const criteria = codingCriteria.filter(({itemId}) => itemId === codingItem.id)
  const scenarioCodingItemRating = find(({codingItemId}) => codingItemId === codingItem.id, scenarioCodingItemRatings)

  return (
    scenarioCodingItemRating.exists(({noCriterionFulfilled}) => noCriterionFulfilled) ||
    some(
      criterion => wasCodingCriterionRated(isAutomatedCodingCriterion(criterion), criterion.id, criterionSelections),
      criteria
    )
  )
}

interface HaveCodingItemsBeenRatedParams {
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly codingItems: Array<CodingItem>
  readonly codingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
  readonly criterionSelections: Array<ScenarioRatingCriterionSelection>
  readonly ratings: Rating[]
}

export const haveCodingItemsBeenRated = ({
  scenarioCodingItemRatings: allScenarioCodingItemRatings,
  codingItems,
  codingCriteria,
  criterionSelections,
  ratings
}: HaveCodingItemsBeenRatedParams) =>
  every(
    codingItem =>
      every(rating => {
        const scenarioCodingItemRatings = allScenarioCodingItemRatings.filter(
          ({codingItemId, ratingId}) => codingItemId === codingItem.id && ratingId === rating.id
        )

        const wasCodingItemRated = hasCodingItemBeenRated({
          codingItem,
          scenarioCodingItemRatings,
          codingCriteria,
          criterionSelections
        })
        return isDefined(rating.finalizedAt) || (scenarioCodingItemRatings.length > 0 && wasCodingItemRated)
      }, ratings),
    codingItems
  )
