/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthenticationType, SurveyExecutionType, UsageField, Salutation } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetSurveyQuery
// ====================================================

export interface GetSurveyQuery_survey_manualPeriod {
  __typename: "Period";
  start: string | null;
  end: string | null;
}

export interface GetSurveyQuery_survey_project_author {
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

export interface GetSurveyQuery_survey_project_surveys {
  __typename: "Survey";
  id: string;
  isTestSurvey: boolean;
}

export interface GetSurveyQuery_survey_project {
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
  author: GetSurveyQuery_survey_project_author;
  maxDurationInSeconds: number;
  isFinalized: boolean;
  surveys: GetSurveyQuery_survey_project_surveys[];
}

export interface GetSurveyQuery_survey_projectModuleProgresses {
  __typename: "ProjectModuleProgress";
  projectModuleId: string;
  inProgressParticipationsCount: number;
  completedParticipationsCount: number;
}

export interface GetSurveyQuery_survey {
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
  manualPeriod: GetSurveyQuery_survey_manualPeriod | null;
  isOpenParticipationEnabled: boolean;
  openParticipationPlayerUrl: string;
  project: GetSurveyQuery_survey_project;
  projectModuleProgresses: GetSurveyQuery_survey_projectModuleProgresses[];
}

export interface GetSurveyQuery {
  survey: GetSurveyQuery_survey | null;
}

export interface GetSurveyQueryVariables {
  id: string;
}
