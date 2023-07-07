/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthenticationType, SurveyExecutionType, UsageField, Salutation } from "./globalTypes";

// ====================================================
// GraphQL fragment: SurveyFragment
// ====================================================

export interface SurveyFragment_manualPeriod {
  __typename: "Period";
  start: string | null;
  end: string | null;
}

export interface SurveyFragment_project_author {
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

export interface SurveyFragment_project_surveys {
  __typename: "Survey";
  id: string;
  isTestSurvey: boolean;
}

export interface SurveyFragment_project {
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
  author: SurveyFragment_project_author;
  maxDurationInSeconds: number;
  isFinalized: boolean;
  surveys: SurveyFragment_project_surveys[];
}

export interface SurveyFragment_projectModuleProgresses {
  __typename: "ProjectModuleProgress";
  projectModuleId: string;
  inProgressParticipationsCount: number;
  completedParticipationsCount: number;
}

export interface SurveyFragment {
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
  manualPeriod: SurveyFragment_manualPeriod | null;
  isOpenParticipationEnabled: boolean;
  openParticipationPlayerUrl: string;
  project: SurveyFragment_project;
  projectModuleProgresses: SurveyFragment_projectModuleProgresses[];
}
