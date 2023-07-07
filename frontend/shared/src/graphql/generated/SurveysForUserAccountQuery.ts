/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthenticationType, SurveyExecutionType, UsageField, Salutation } from "./globalTypes";

// ====================================================
// GraphQL query operation: SurveysForUserAccountQuery
// ====================================================

export interface SurveysForUserAccountQuery_surveysForUserAccount_manualPeriod {
  __typename: "Period";
  start: string | null;
  end: string | null;
}

export interface SurveysForUserAccountQuery_surveysForUserAccount_project_author {
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

export interface SurveysForUserAccountQuery_surveysForUserAccount_project_surveys {
  __typename: "Survey";
  id: string;
  isTestSurvey: boolean;
}

export interface SurveysForUserAccountQuery_surveysForUserAccount_project {
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
  author: SurveysForUserAccountQuery_surveysForUserAccount_project_author;
  maxDurationInSeconds: number;
  isFinalized: boolean;
  surveys: SurveysForUserAccountQuery_surveysForUserAccount_project_surveys[];
}

export interface SurveysForUserAccountQuery_surveysForUserAccount_projectModuleProgresses {
  __typename: "ProjectModuleProgress";
  projectModuleId: string;
  inProgressParticipationsCount: number;
  completedParticipationsCount: number;
}

export interface SurveysForUserAccountQuery_surveysForUserAccount {
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
  manualPeriod: SurveysForUserAccountQuery_surveysForUserAccount_manualPeriod | null;
  isOpenParticipationEnabled: boolean;
  openParticipationPlayerUrl: string;
  project: SurveysForUserAccountQuery_surveysForUserAccount_project;
  projectModuleProgresses: SurveysForUserAccountQuery_surveysForUserAccount_projectModuleProgresses[];
}

export interface SurveysForUserAccountQuery {
  surveysForUserAccount: SurveysForUserAccountQuery_surveysForUserAccount[];
}

export interface SurveysForUserAccountQueryVariables {
  userAccountId: string;
}
