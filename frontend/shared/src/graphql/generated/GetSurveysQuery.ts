/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthenticationType, SurveyExecutionType, UsageField, Salutation } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetSurveysQuery
// ====================================================

export interface GetSurveysQuery_surveys_manualPeriod {
  __typename: "Period";
  start: string | null;
  end: string | null;
}

export interface GetSurveysQuery_surveys_project_author {
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

export interface GetSurveysQuery_surveys_project_surveys {
  __typename: "Survey";
  id: string;
  isTestSurvey: boolean;
}

export interface GetSurveysQuery_surveys_project {
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
  author: GetSurveysQuery_surveys_project_author;
  maxDurationInSeconds: number;
  isFinalized: boolean;
  surveys: GetSurveysQuery_surveys_project_surveys[];
}

export interface GetSurveysQuery_surveys_projectModuleProgresses {
  __typename: "ProjectModuleProgress";
  projectModuleId: string;
  inProgressParticipationsCount: number;
  completedParticipationsCount: number;
}

export interface GetSurveysQuery_surveys {
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
  manualPeriod: GetSurveysQuery_surveys_manualPeriod | null;
  isOpenParticipationEnabled: boolean;
  openParticipationPlayerUrl: string;
  project: GetSurveysQuery_surveys_project;
  projectModuleProgresses: GetSurveysQuery_surveys_projectModuleProgresses[];
}

export interface GetSurveysQuery {
  surveys: GetSurveysQuery_surveys[];
}

export interface GetSurveysQueryVariables {
  projectId: string;
}
