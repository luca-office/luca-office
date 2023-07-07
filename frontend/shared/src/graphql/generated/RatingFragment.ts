/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RatingFragment
// ====================================================

export interface RatingFragment {
  __typename: "Rating";
  id: string;
  createdAt: string;
  modifiedAt: string;
  finalizedAt: string | null;
  surveyId: string;
  userAccountId: string;
  isFinalScore: boolean;
}
