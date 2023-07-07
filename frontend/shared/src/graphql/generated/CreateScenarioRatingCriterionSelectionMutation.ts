/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioRatingCriterionSelectionCreation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateScenarioRatingCriterionSelectionMutation
// ====================================================

export interface CreateScenarioRatingCriterionSelectionMutation_createScenarioRatingCriterionSelection {
  __typename: "ScenarioRatingCriterionSelection";
  createdAt: string;
  manualCriterionId: string | null;
  automatedCriterionId: string | null;
  scenarioCodingItemRatingId: string;
}

export interface CreateScenarioRatingCriterionSelectionMutation {
  createScenarioRatingCriterionSelection: CreateScenarioRatingCriterionSelectionMutation_createScenarioRatingCriterionSelection;
}

export interface CreateScenarioRatingCriterionSelectionMutationVariables {
  creation: ScenarioRatingCriterionSelectionCreation;
}
