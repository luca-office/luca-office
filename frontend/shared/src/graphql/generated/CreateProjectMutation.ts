/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProjectCreation, UsageField, Salutation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateProjectMutation
// ====================================================

export interface CreateProjectMutation_createProject_author {
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

export interface CreateProjectMutation_createProject_surveys {
  __typename: "Survey";
  id: string;
  isTestSurvey: boolean;
}

export interface CreateProjectMutation_createProject {
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
  author: CreateProjectMutation_createProject_author;
  maxDurationInSeconds: number;
  isFinalized: boolean;
  surveys: CreateProjectMutation_createProject_surveys[];
}

export interface CreateProjectMutation {
  createProject: CreateProjectMutation_createProject;
}

export interface CreateProjectMutationVariables {
  creation: ProjectCreation;
}
