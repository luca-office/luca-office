/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ConfirmBackofficeTermsAndConditionsMutation
// ====================================================

export interface ConfirmBackofficeTermsAndConditionsMutation_confirmBackofficeTermsAndConditions {
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

export interface ConfirmBackofficeTermsAndConditionsMutation {
  confirmBackofficeTermsAndConditions: ConfirmBackofficeTermsAndConditionsMutation_confirmBackofficeTermsAndConditions;
}

export interface ConfirmBackofficeTermsAndConditionsMutationVariables {
  hasConfirmedBackofficeTermsAndConditions: boolean;
}
