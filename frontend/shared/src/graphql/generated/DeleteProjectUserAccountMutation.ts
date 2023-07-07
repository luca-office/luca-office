/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteProjectUserAccountMutation
// ====================================================

export interface DeleteProjectUserAccountMutation_deleteProjectUserAccount {
  __typename: "ProjectUserAccount";
  projectId: string;
  userAccountId: string;
}

export interface DeleteProjectUserAccountMutation {
  deleteProjectUserAccount: DeleteProjectUserAccountMutation_deleteProjectUserAccount;
}

export interface DeleteProjectUserAccountMutationVariables {
  projectId: string;
  userAccountId: string;
}
