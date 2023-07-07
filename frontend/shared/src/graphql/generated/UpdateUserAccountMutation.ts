/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserAccountUpdate, Salutation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserAccountMutation
// ====================================================

export interface UpdateUserAccountMutation_updateUserAccount {
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

export interface UpdateUserAccountMutation {
  updateUserAccount: UpdateUserAccountMutation_updateUserAccount;
}

export interface UpdateUserAccountMutationVariables {
  id: string;
  update: UserAccountUpdate;
}
