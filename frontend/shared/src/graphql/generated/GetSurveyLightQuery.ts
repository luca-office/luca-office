/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthenticationType, SurveyExecutionType, UsageField, Salutation } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetSurveyLightQuery
// ====================================================

export interface GetSurveyLightQuery_survey_manualPeriod {
  __typename: "Period";
  start: string | null;
  end: string | null;
}

export interface GetSurveyLightQuery_survey_project_author {
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

export interface GetSurveyLightQuery_survey_project_surveys {
  __typename: "Survey";
  id: string;
  isTestSurvey: boolean;
}

export interface GetSurveyLightQuery_survey_project {
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
  author: GetSurveyLightQuery_survey_project_author;
  maxDurationInSeconds: number;
  isFinalized: boolean;
  surveys: GetSurveyLightQuery_survey_project_surveys[];
}

export interface GetSurveyLightQuery_survey {
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
  isOpenParticipationEnabled: boolean;
  openParticipationPlayerUrl: string;
  manualPeriod: GetSurveyLightQuery_survey_manualPeriod | null;
  project: GetSurveyLightQuery_survey_project;
}

export interface GetSurveyLightQuery {
  survey: GetSurveyLightQuery_survey | null;
}

export interface GetSurveyLightQueryVariables {
  id: string;
}
