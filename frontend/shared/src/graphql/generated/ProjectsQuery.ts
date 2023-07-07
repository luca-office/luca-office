/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UsageField, Salutation } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProjectsQuery
// ====================================================

export interface ProjectsQuery_projects_author {
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

export interface ProjectsQuery_projects_surveys {
  __typename: "Survey";
  id: string;
  isTestSurvey: boolean;
}

export interface ProjectsQuery_projects {
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
  author: ProjectsQuery_projects_author;
  maxDurationInSeconds: number;
  isFinalized: boolean;
  surveys: ProjectsQuery_projects_surveys[];
}

export interface ProjectsQuery {
  projects: ProjectsQuery_projects[];
}
