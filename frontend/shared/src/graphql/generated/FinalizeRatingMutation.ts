/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FinalizeRatingMutation
// ====================================================

export interface FinalizeRatingMutation_finalizeRating {
  __typename: "Rating";
  id: string;
  createdAt: string;
  modifiedAt: string;
  finalizedAt: string | null;
  surveyId: string;
  userAccountId: string;
  isFinalScore: boolean;
}

export interface FinalizeRatingMutation {
  finalizeRating: FinalizeRatingMutation_finalizeRating;
}

export interface FinalizeRatingMutationVariables {
  id: string;
}
