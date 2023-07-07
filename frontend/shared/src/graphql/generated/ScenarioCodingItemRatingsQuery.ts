/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ScenarioCodingItemRatingsQuery
// ====================================================

export interface ScenarioCodingItemRatingsQuery_scenarioCodingItemRatings_criterionSelections {
  __typename: "ScenarioRatingCriterionSelection";
  createdAt: string;
  manualCriterionId: string | null;
  automatedCriterionId: string | null;
  scenarioCodingItemRatingId: string;
}

export interface ScenarioCodingItemRatingsQuery_scenarioCodingItemRatings {
  __typename: "ScenarioCodingItemRating";
  id: string;
  createdAt: string;
  modifiedAt: string;
  noCriterionFulfilled: boolean;
  surveyInvitationId: string;
  ratingId: string;
  codingItemId: string;
  criterionSelections: ScenarioCodingItemRatingsQuery_scenarioCodingItemRatings_criterionSelections[];
}

export interface ScenarioCodingItemRatingsQuery {
  scenarioCodingItemRatings: ScenarioCodingItemRatingsQuery_scenarioCodingItemRatings[];
}

export interface ScenarioCodingItemRatingsQueryVariables {
  ratingId: string;
}
