/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation } from "./globalTypes";

// ====================================================
// GraphQL query operation: SurveyUserAccountsQuery
// ====================================================

export interface SurveyUserAccountsQuery_userAccountsForSurvey {
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

export interface SurveyUserAccountsQuery {
  userAccountsForSurvey: SurveyUserAccountsQuery_userAccountsForSurvey[];
}

export interface SurveyUserAccountsQueryVariables {
  surveyId: string;
}
