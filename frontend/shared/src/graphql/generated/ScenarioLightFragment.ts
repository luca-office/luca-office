/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation } from "./globalTypes";

// ====================================================
// GraphQL fragment: ScenarioLightFragment
// ====================================================

export interface ScenarioLightFragment_author {
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

export interface ScenarioLightFragment {
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
  author: ScenarioLightFragment_author;
}
