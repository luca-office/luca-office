/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SurveyUpdate, AuthenticationType, SurveyExecutionType, UsageField, Salutation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSurveyMutation
// ====================================================

export interface UpdateSurveyMutation_updateSurvey_manualPeriod {
  __typename: "Period";
  start: string | null;
  end: string | null;
}

export interface UpdateSurveyMutation_updateSurvey_project_author {
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

export interface UpdateSurveyMutation_updateSurvey_project_surveys {
  __typename: "Survey";
  id: string;
  isTestSurvey: boolean;
}

export interface UpdateSurveyMutation_updateSurvey_project {
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
  author: UpdateSurveyMutation_updateSurvey_project_author;
  maxDurationInSeconds: number;
  isFinalized: boolean;
  surveys: UpdateSurveyMutation_updateSurvey_project_surveys[];
}

export interface UpdateSurveyMutation_updateSurvey_projectModuleProgresses {
  __typename: "ProjectModuleProgress";
  projectModuleId: string;
  inProgressParticipationsCount: number;
  completedParticipationsCount: number;
}

export interface UpdateSurveyMutation_updateSurvey {
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
  manualPeriod: UpdateSurveyMutation_updateSurvey_manualPeriod | null;
  isOpenParticipationEnabled: boolean;
  openParticipationPlayerUrl: string;
  project: UpdateSurveyMutation_updateSurvey_project;
  projectModuleProgresses: UpdateSurveyMutation_updateSurvey_projectModuleProgresses[];
}

export interface UpdateSurveyMutation {
  updateSurvey: UpdateSurveyMutation_updateSurvey;
}

export interface UpdateSurveyMutationVariables {
  id: string;
  update: SurveyUpdate;
}
