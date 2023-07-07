/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateProjectUserAccountMutation
// ====================================================

export interface CreateProjectUserAccountMutation_createProjectUserAccount {
  __typename: "ProjectUserAccount";
  projectId: string;
  userAccountId: string;
}

export interface CreateProjectUserAccountMutation {
  createProjectUserAccount: CreateProjectUserAccountMutation_createProjectUserAccount;
}

export interface CreateProjectUserAccountMutationVariables {
  projectId: string;
  userAccountId: string;
}
