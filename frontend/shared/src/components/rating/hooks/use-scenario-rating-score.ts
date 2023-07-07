import {
  AutomatedCodingCriterion,
  AutomatedCodingItem,
  CodingCriterion,
  CodingItem,
  ScenarioCodingItemRating
} from "../../../models"
import {ScenarioCriterionSelection} from "../models"
import {
  getAverageScore,
  getAverageScoreForAllParticipants,
  getMaxScoreOfAllCodingItems,
  getScoreOfCodingCriteria,
  getSelectedCodingCriteria
} from "../utils"

export interface UseScenarioRatingScoreHook {
  readonly score: number
  readonly maxScore: number
  readonly averageScore: number
}

interface UseScenarioRatingScoreParams {
  readonly codingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
  readonly criterionSelections: Array<ScenarioCriterionSelection>
  readonly codingItems: Array<CodingItem | AutomatedCodingItem>
  readonly allCriterionSelections?: Array<ScenarioCriterionSelection>
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly averageScoreForAllParticipants: boolean
  readonly selectedSurveyInvitationId?: UUID
}

export const useScenarioRatingScore = ({
  codingCriteria,
  criterionSelections,
  codingItems,
  allCriterionSelections,
  scenarioCodingItemRatings,
  averageScoreForAllParticipants,
  selectedSurveyInvitationId
}: UseScenarioRatingScoreParams): UseScenarioRatingScoreHook => {
  const selectedCodingCriteria = getSelectedCodingCriteria(codingCriteria, criterionSelections)

  const selectedCriteriaSelectionsForParticipant = scenarioCodingItemRatings
    .filter(rating => rating.surveyInvitationId === selectedSurveyInvitationId)
    .flatMap(rating => rating.criterionSelections)

  const selectedCodingCriteriaForParticipant = getSelectedCodingCriteria(
    codingCriteria,
    selectedCriteriaSelectionsForParticipant
  )

  const allSelectedCodingCriteria =
    allCriterionSelections !== undefined
      ? getSelectedCodingCriteria(codingCriteria, allCriterionSelections)
      : selectedCodingCriteria

  const score = getScoreOfCodingCriteria(selectedCodingCriteriaForParticipant)

  const averageScore = averageScoreForAllParticipants
    ? getAverageScoreForAllParticipants({allSelectedCodingCriteria, codingItems, scenarioCodingItemRatings})
    : getAverageScore({
        allSelectedCodingCriteria,
        codingItems
      })

  const maxScore = getMaxScoreOfAllCodingItems(codingItems)

  return {score, maxScore, averageScore}
}
