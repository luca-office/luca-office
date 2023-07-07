import {FreetextQuestionCodingCriterion, FreetextQuestionRatingCriterionSelection} from "../../models"
import {questionnaireQuestionsMock} from "./questionnaire-questions.mock"

const criterionIds: string[] = questionnaireQuestionsMock[0].freetextQuestionCodingCriteria.map(
  ({id}: FreetextQuestionCodingCriterion) => id
)

export const getFreetextQuestionRatingCriterionSelectionsMock = (
  freetextQuestionRatingId: string
): FreetextQuestionRatingCriterionSelection[] =>
  criterionIds.map(criterionId => ({
    __typename: "FreetextQuestionRatingCriterionSelection",
    createdAt: new Date(2020, 10, 5).toISOString(),
    freetextQuestionRatingId,
    criterionId
  }))

export const freetextQuestionRatingCriterionSelectionMock: FreetextQuestionRatingCriterionSelection = {
  __typename: "FreetextQuestionRatingCriterionSelection",
  createdAt: new Date(2020, 10, 5).toISOString(),
  freetextQuestionRatingId: "b9294ebd-18b5-4a5d-b5c8-f5a1138e769e",
  criterionId: "e1abc02a-3723-48b6-bdae-8fb507dcdc49"
}
