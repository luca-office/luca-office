/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProjectUpdate, UsageField, Salutation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateProjectMutation
// ====================================================

export interface UpdateProjectMutation_updateProject_author {
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

export interface UpdateProjectMutation_updateProject_surveys {
  __typename: "Survey";
  id: string;
  isTestSurvey: boolean;
}

export interface UpdateProjectMutation_updateProject {
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
  author: UpdateProjectMutation_updateProject_author;
  maxDurationInSeconds: number;
  isFinalized: boolean;
  surveys: UpdateProjectMutation_updateProject_surveys[];
}

export interface UpdateProjectMutation {
  updateProject: UpdateProjectMutation_updateProject;
}

export interface UpdateProjectMutationVariables {
  id: string;
  update: ProjectUpdate;
}
