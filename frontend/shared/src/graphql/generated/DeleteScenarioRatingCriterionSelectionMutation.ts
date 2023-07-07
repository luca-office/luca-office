/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteScenarioRatingCriterionSelectionMutation
// ====================================================

export interface DeleteScenarioRatingCriterionSelectionMutation_deleteScenarioRatingCriterionSelection {
  __typename: "ScenarioRatingCriterionSelection";
  createdAt: string;
  manualCriterionId: string | null;
  automatedCriterionId: string | null;
  scenarioCodingItemRatingId: string;
}

export interface DeleteScenarioRatingCriterionSelectionMutation {
  deleteScenarioRatingCriterionSelection: DeleteScenarioRatingCriterionSelectionMutation_deleteScenarioRatingCriterionSelection;
}

export interface DeleteScenarioRatingCriterionSelectionMutationVariables {
  scenarioCodingItemRatingId: string;
  manualCriterionId?: string | null;
  automatedCriterionId?: string | null;
}
