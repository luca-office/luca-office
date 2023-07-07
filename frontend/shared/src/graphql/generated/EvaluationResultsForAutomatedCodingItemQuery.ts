/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EvaluationResultsForAutomatedCodingItemQuery
// ====================================================

export interface EvaluationResultsForAutomatedCodingItemQuery_evaluationResultsForAutomatedCodingItem {
  __typename: "AutomatedCodingCriterionEvaluationResult";
  criterionId: string;
  isFulfilled: boolean;
}

export interface EvaluationResultsForAutomatedCodingItemQuery {
  evaluationResultsForAutomatedCodingItem: EvaluationResultsForAutomatedCodingItemQuery_evaluationResultsForAutomatedCodingItem[];
}

export interface EvaluationResultsForAutomatedCodingItemQueryVariables {
  id: string;
  surveyInvitationId: string;
  scenarioId: string;
}
