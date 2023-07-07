/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioCodingItemRatingCreation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateScenarioCodingItemRatingMutation
// ====================================================

export interface CreateScenarioCodingItemRatingMutation_createScenarioCodingItemRating_criterionSelections {
  __typename: "ScenarioRatingCriterionSelection";
  createdAt: string;
  manualCriterionId: string | null;
  automatedCriterionId: string | null;
  scenarioCodingItemRatingId: string;
}

export interface CreateScenarioCodingItemRatingMutation_createScenarioCodingItemRating {
  __typename: "ScenarioCodingItemRating";
  id: string;
  createdAt: string;
  modifiedAt: string;
  noCriterionFulfilled: boolean;
  surveyInvitationId: string;
  ratingId: string;
  codingItemId: string;
  criterionSelections: CreateScenarioCodingItemRatingMutation_createScenarioCodingItemRating_criterionSelections[];
}

export interface CreateScenarioCodingItemRatingMutation {
  createScenarioCodingItemRating: CreateScenarioCodingItemRatingMutation_createScenarioCodingItemRating;
}

export interface CreateScenarioCodingItemRatingMutationVariables {
  creation: ScenarioCodingItemRatingCreation;
}
