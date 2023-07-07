/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSurveyUserAccountMutation
// ====================================================

export interface CreateSurveyUserAccountMutation_createSurveyUserAccount {
  __typename: "SurveyUserAccount";
  surveyId: string;
  userAccountId: string;
}

export interface CreateSurveyUserAccountMutation {
  createSurveyUserAccount: CreateSurveyUserAccountMutation_createSurveyUserAccount;
}

export interface CreateSurveyUserAccountMutationVariables {
  surveyId: string;
  userAccountId: string;
}
