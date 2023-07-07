/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ScenarioCodingItemRatingFragment
// ====================================================

export interface ScenarioCodingItemRatingFragment_criterionSelections {
  __typename: "ScenarioRatingCriterionSelection";
  createdAt: string;
  manualCriterionId: string | null;
  automatedCriterionId: string | null;
  scenarioCodingItemRatingId: string;
}

export interface ScenarioCodingItemRatingFragment {
  __typename: "ScenarioCodingItemRating";
  id: string;
  createdAt: string;
  modifiedAt: string;
  noCriterionFulfilled: boolean;
  surveyInvitationId: string;
  ratingId: string;
  codingItemId: string;
  criterionSelections: ScenarioCodingItemRatingFragment_criterionSelections[];
}
