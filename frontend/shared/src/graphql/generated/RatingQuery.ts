/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RatingQuery
// ====================================================

export interface RatingQuery_rating {
  __typename: "Rating";
  id: string;
  createdAt: string;
  modifiedAt: string;
  finalizedAt: string | null;
  surveyId: string;
  userAccountId: string;
  isFinalScore: boolean;
}

export interface RatingQuery {
  rating: RatingQuery_rating | null;
}

export interface RatingQueryVariables {
  id: string;
}
