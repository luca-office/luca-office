/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation } from "./globalTypes";

// ====================================================
// GraphQL query operation: CheckLoginQuery
// ====================================================

export interface CheckLoginQuery_checkLogin {
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
  needsToConfirmBackofficeTermsAndConditions: boolean;
}

export interface CheckLoginQuery {
  checkLogin: CheckLoginQuery_checkLogin | null;
}
