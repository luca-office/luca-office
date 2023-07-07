/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UsageField, Salutation } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProjectQuery
// ====================================================

export interface ProjectQuery_project_author {
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

export interface ProjectQuery_project_surveys {
  __typename: "Survey";
  id: string;
  isTestSurvey: boolean;
}

export interface ProjectQuery_project {
  __typename: "Project";
  id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  authorId: string;
  description: string;
  audience: string;
  usageField: UsageField;
  welcomeText: string;
  author: ProjectQuery_project_author;
  maxDurationInSeconds: number;
  isFinalized: boolean;
  surveys: ProjectQuery_project_surveys[];
}

export interface ProjectQuery {
  project: ProjectQuery_project | null;
}

export interface ProjectQueryVariables {
  id: string;
}
