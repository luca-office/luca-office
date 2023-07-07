/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserAccountCreation, Salutation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUserAccountMutation
// ====================================================

export interface CreateUserAccountMutation_createUserAccount {
  __typename: "UserAccount";
  id: string;
  createdAt: string;
  modifiedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  salutation: Salutation;
  mayAdministrateUserAccounts: boolean;
  mayAdministrateRScripts: boolean;
  mayArchive: boolean;
  mayFinalizeWithoutPublishing: boolean;
}

export interface CreateUserAccountMutation {
  createUserAccount: CreateUserAccountMutation_createUserAccount;
}

export interface CreateUserAccountMutationVariables {
  creation: UserAccountCreation;
}
