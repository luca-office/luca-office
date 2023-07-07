import {AutomatedCodingCriterionEvaluationResult} from "../../models"
import {automatedCodingCriteriaMock} from "./coding-criteria.mock"

export const evaluationResultsForAutomatedCodingItemsMock: AutomatedCodingCriterionEvaluationResult[] = automatedCodingCriteriaMock.map(
  ({id: criterionId}, index) => ({
    __typename: "AutomatedCodingCriterionEvaluationResult",
    criterionId,
    isFulfilled: index % 2 === 0
  })
)
