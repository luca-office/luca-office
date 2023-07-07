/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioCodingItemRatingUpdate } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateScenarioCodingItemRatingMutation
// ====================================================

export interface UpdateScenarioCodingItemRatingMutation_updateScenarioCodingItemRating_criterionSelections {
  __typename: "ScenarioRatingCriterionSelection";
  createdAt: string;
  manualCriterionId: string | null;
  automatedCriterionId: string | null;
  scenarioCodingItemRatingId: string;
}

export interface UpdateScenarioCodingItemRatingMutation_updateScenarioCodingItemRating {
  __typename: "ScenarioCodingItemRating";
  id: string;
  createdAt: string;
  modifiedAt: string;
  noCriterionFulfilled: boolean;
  surveyInvitationId: string;
  ratingId: string;
  codingItemId: string;
  criterionSelections: UpdateScenarioCodingItemRatingMutation_updateScenarioCodingItemRating_criterionSelections[];
}

export interface UpdateScenarioCodingItemRatingMutation {
  updateScenarioCodingItemRating: UpdateScenarioCodingItemRatingMutation_updateScenarioCodingItemRating;
}

export interface UpdateScenarioCodingItemRatingMutationVariables {
  id: string;
  update: ScenarioCodingItemRatingUpdate;
}
