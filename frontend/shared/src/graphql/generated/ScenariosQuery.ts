/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation } from "./globalTypes";

// ====================================================
// GraphQL query operation: ScenariosQuery
// ====================================================

export interface ScenariosQuery_scenarios_author {
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

export interface ScenariosQuery_scenarios {
  __typename: "Scenario";
  id: string;
  createdAt: string;
  modifiedAt: string;
  archivedAt: string | null;
  finalizedAt: string | null;
  publishedAt: string | null;
  name: string;
  description: string;
  maxDurationInSeconds: number | null;
  tags: string[];
  author: ScenariosQuery_scenarios_author;
}

export interface ScenariosQuery {
  scenarios: ScenariosQuery_scenarios[];
}
