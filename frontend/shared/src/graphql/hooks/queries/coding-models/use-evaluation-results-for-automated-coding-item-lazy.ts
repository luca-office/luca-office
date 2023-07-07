import {useLazyQuery} from "@apollo/client"
import {AutomatedCodingCriterionEvaluationResult} from "../../../../models"
import {
  EvaluationResultsForAutomatedCodingItemQuery,
  EvaluationResultsForAutomatedCodingItemQueryVariables
} from "../../../generated/EvaluationResultsForAutomatedCodingItemQuery"
import {evaluationResultsForAutomatedCodingItemQuery} from "../../../queries"

interface GetEvaluationResultsForAutomatedCodingItemParams {
  readonly codingItemId: UUID
  readonly surveyInvitationId: UUID
  readonly scenarioId: UUID
}

export interface UseEvaluationResultsForAutomatedCodingItemLazyHook {
  readonly evaluationResultsForAutomatedCodingItem: AutomatedCodingCriterionEvaluationResult[]
  readonly evaluationResultsForAutomatedCodingItemLoading: boolean
  readonly getEvaluationResultsForAutomatedCodingItem: (
    params: GetEvaluationResultsForAutomatedCodingItemParams
  ) => void
}

export const useEvaluationResultsForAutomatedCodingItemLazy = (): UseEvaluationResultsForAutomatedCodingItemLazyHook => {
  const [getEvaluationResultsForAutomatedCodingItem, {data, loading}] = useLazyQuery<
    EvaluationResultsForAutomatedCodingItemQuery,
    EvaluationResultsForAutomatedCodingItemQueryVariables
  >(evaluationResultsForAutomatedCodingItemQuery)

  return {
    evaluationResultsForAutomatedCodingItem: data?.evaluationResultsForAutomatedCodingItem ?? [],
    evaluationResultsForAutomatedCodingItemLoading: loading,
    getEvaluationResultsForAutomatedCodingItem: ({
      codingItemId,
      surveyInvitationId,
      scenarioId
    }: GetEvaluationResultsForAutomatedCodingItemParams) =>
      getEvaluationResultsForAutomatedCodingItem({variables: {id: codingItemId, surveyInvitationId, scenarioId}})
  }
}
