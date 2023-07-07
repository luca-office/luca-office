/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RatingsQuery
// ====================================================

export interface RatingsQuery_ratings {
  __typename: "Rating";
  id: string;
  createdAt: string;
  modifiedAt: string;
  finalizedAt: string | null;
  surveyId: string;
  userAccountId: string;
  isFinalScore: boolean;
}

export interface RatingsQuery {
  ratings: RatingsQuery_ratings[];
}

export interface RatingsQueryVariables {
  surveyId: string;
}
