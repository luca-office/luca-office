import {AutomatedCodingCriterionEvaluationResult} from "../../models"
import {automatedCodingCriteriaMock} from "./coding-criteria.mock"

export const automatedCodingCriterionEvaluationResultMock: AutomatedCodingCriterionEvaluationResult[] = automatedCodingCriteriaMock.map(
  (automatedCodingCriterion, index) => ({
    __typename: "AutomatedCodingCriterionEvaluationResult",
    criterionId: automatedCodingCriterion.id,
    isFulfilled: !!(index % 2)
  })
)
