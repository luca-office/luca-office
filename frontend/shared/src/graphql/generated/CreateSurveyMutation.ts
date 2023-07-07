/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SurveyCreation, AuthenticationType, SurveyExecutionType, UsageField, Salutation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSurveyMutation
// ====================================================

export interface CreateSurveyMutation_createSurvey_manualPeriod {
  __typename: "Period";
  start: string | null;
  end: string | null;
}

export interface CreateSurveyMutation_createSurvey_project_author {
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

export interface CreateSurveyMutation_createSurvey_project_surveys {
  __typename: "Survey";
  id: string;
  isTestSurvey: boolean;
}

export interface CreateSurveyMutation_createSurvey_project {
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
  author: CreateSurveyMutation_createSurvey_project_author;
  maxDurationInSeconds: number;
  isFinalized: boolean;
  surveys: CreateSurveyMutation_createSurvey_project_surveys[];
}

export interface CreateSurveyMutation_createSurvey_projectModuleProgresses {
  __typename: "ProjectModuleProgress";
  projectModuleId: string;
  inProgressParticipationsCount: number;
  completedParticipationsCount: number;
}

export interface CreateSurveyMutation_createSurvey {
  __typename: "Survey";
  id: string;
  createdAt: string;
  modifiedAt: string;
  startsAt: string | null;
  projectId: string;
  title: string;
  description: string;
  endsAt: string | null;
  authenticationType: AuthenticationType;
  invitationsCount: number;
  inProgressParticipationsCount: number;
  executionType: SurveyExecutionType;
  completedParticipationsCount: number;
  isCompleted: boolean;
  isTestSurvey: boolean;
  isRatingFinalized: boolean;
  manualPeriod: CreateSurveyMutation_createSurvey_manualPeriod | null;
  isOpenParticipationEnabled: boolean;
  openParticipationPlayerUrl: string;
  project: CreateSurveyMutation_createSurvey_project;
  projectModuleProgresses: CreateSurveyMutation_createSurvey_projectModuleProgresses[];
}

export interface CreateSurveyMutation {
  createSurvey: CreateSurveyMutation_createSurvey;
}

export interface CreateSurveyMutationVariables {
  creation: SurveyCreation;
}
