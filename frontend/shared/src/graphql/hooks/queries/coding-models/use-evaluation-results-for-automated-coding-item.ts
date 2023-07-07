import {useQuery} from "@apollo/client"
import {AutomatedCodingCriterionEvaluationResult} from "../../../../models"
import {
  EvaluationResultsForAutomatedCodingItemQuery,
  EvaluationResultsForAutomatedCodingItemQueryVariables
} from "../../../generated/EvaluationResultsForAutomatedCodingItemQuery"
import {evaluationResultsForAutomatedCodingItemQuery} from "../../../queries"

export interface UseEvaluationResultsForAutomatedCodingItemHook {
  readonly evaluationResultsForAutomatedCodingItem: AutomatedCodingCriterionEvaluationResult[]
  readonly evaluationResultsForAutomatedCodingItemLoading: boolean
}

interface UseEvaluationResultsForAutomatedCodingItemParams {
  readonly codingItemId: UUID
  readonly surveyInvitationId: UUID
  readonly scenarioId: UUID
}

export const useEvaluationResultsForAutomatedCodingItem = ({
  codingItemId,
  surveyInvitationId,
  scenarioId
}: UseEvaluationResultsForAutomatedCodingItemParams): UseEvaluationResultsForAutomatedCodingItemHook => {
  const {data, loading} = useQuery<
    EvaluationResultsForAutomatedCodingItemQuery,
    EvaluationResultsForAutomatedCodingItemQueryVariables
  >(evaluationResultsForAutomatedCodingItemQuery, {variables: {id: codingItemId, surveyInvitationId, scenarioId}})

  return {
    evaluationResultsForAutomatedCodingItem: data?.evaluationResultsForAutomatedCodingItem ?? [],
    evaluationResultsForAutomatedCodingItemLoading: loading
  }
}
