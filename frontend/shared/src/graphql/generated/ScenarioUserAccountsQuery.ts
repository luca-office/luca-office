/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation } from "./globalTypes";

// ====================================================
// GraphQL query operation: ScenarioUserAccountsQuery
// ====================================================

export interface ScenarioUserAccountsQuery_userAccountsForScenario {
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

export interface ScenarioUserAccountsQuery {
  userAccountsForScenario: ScenarioUserAccountsQuery_userAccountsForScenario[];
}

export interface ScenarioUserAccountsQueryVariables {
  scenarioId: string;
}
