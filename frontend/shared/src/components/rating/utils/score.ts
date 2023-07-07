import {sum} from "lodash"
import {groupBy, mean} from "lodash-es"
import {
  AutomatedCodingCriterion,
  AutomatedCodingItem,
  CodingCriterion,
  CodingItem,
  ScenarioCodingItemRating
} from "../../../models"
import {exists, roundNumber} from "../../../utils"
import {getAverageScoreOfCodingCriteria, getScoreOfCodingCriteria, getSelectedCodingCriteria} from "./coding-criterion"

interface GetAverageScoreParams {
  readonly allSelectedCodingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
  readonly codingItems: Array<CodingItem | AutomatedCodingItem>
}

type ScoreByParticipantId = {
  [id: string]: number
}
type CodingItemRatingByParticipantId = {
  [id: string]: ScenarioCodingItemRating[]
}

export const getAverageScore = ({allSelectedCodingCriteria, codingItems}: GetAverageScoreParams): number => {
  const criterionSelectionsMap = allSelectedCodingCriteria.reduce(
    (accumulator, selectedCodingCriterion) => ({
      ...accumulator,
      [selectedCodingCriterion.itemId]: [
        ...(accumulator[selectedCodingCriterion.itemId] ?? []),
        selectedCodingCriterion
      ]
    }),
    {} as {readonly [codingItemId: string]: Array<CodingCriterion | AutomatedCodingCriterion>}
  )
  const filteredCriterionSelections = Object.keys(criterionSelectionsMap)
    .filter(codingItemId => exists(codingItem => codingItem.id === codingItemId, codingItems))
    .reduce(
      (accumulator, codingItemId) => [...accumulator, ...(criterionSelectionsMap[codingItemId] ?? [])],
      [] as Array<CodingCriterion | AutomatedCodingCriterion>
    )

  return roundNumber(getAverageScoreOfCodingCriteria(filteredCriterionSelections))
}

interface GetAverageScoreForAllParticipantsParams {
  readonly allSelectedCodingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
  readonly codingItems: Array<CodingItem | AutomatedCodingItem>
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
}

export const getAverageScoreForAllParticipants = ({
  allSelectedCodingCriteria,
  codingItems,
  scenarioCodingItemRatings
}: GetAverageScoreForAllParticipantsParams): number => {
  const ratingsByParticipantId: CodingItemRatingByParticipantId = groupBy(
    scenarioCodingItemRatings,
    rating => rating.surveyInvitationId
  )

  const scoreOfSelectedCriteriaByParticipantId: ScoreByParticipantId = Object.keys(ratingsByParticipantId).reduce(
    (acc, participantId) => ({
      ...acc,
      [participantId]: ratingsByParticipantId[participantId]
        .filter(rating => codingItems.map(item => item.id).includes(rating.codingItemId))
        .map(rating => getSelectedCodingCriteria(allSelectedCodingCriteria, rating.criterionSelections))
        .map(getScoreOfCodingCriteria)
        .reduce((acc, score) => acc + score, 0)
    }),
    {} as ScoreByParticipantId
  )

  const averageScore = mean(Object.values(scoreOfSelectedCriteriaByParticipantId))

  return roundNumber(averageScore)
}
