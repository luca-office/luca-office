/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation, ProjectModuleProgressType, AuthenticationType, SurveyExecutionType, UsageField, SurveyParticipationStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: SurveyParticipationInfoQuery
// ====================================================

export interface SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_participantData {
  __typename: "ParticipantData";
  firstName: string;
  lastName: string;
  salutation: Salutation;
}

export interface SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_projectModuleProgresses {
  __typename: "ParticipantProjectModuleProgress";
  scenarioId: string | null;
  questionnaireId: string | null;
  status: ProjectModuleProgressType;
  questionsInProgressCount: number | null;
  requiredDocumentsCount: number | null;
  openedRequiredDocumentsCount: number | null;
}

export interface SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_survey_manualPeriod {
  __typename: "Period";
  start: string | null;
  end: string | null;
}

export interface SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_survey_project_author {
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

export interface SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_survey_project_surveys {
  __typename: "Survey";
  id: string;
  isTestSurvey: boolean;
}

export interface SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_survey_project {
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
  author: SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_survey_project_author;
  maxDurationInSeconds: number;
  isFinalized: boolean;
  surveys: SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_survey_project_surveys[];
}

export interface SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_survey_projectModuleProgresses {
  __typename: "ProjectModuleProgress";
  projectModuleId: string;
  inProgressParticipationsCount: number;
  completedParticipationsCount: number;
}

export interface SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_survey {
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
  manualPeriod: SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_survey_manualPeriod | null;
  isOpenParticipationEnabled: boolean;
  openParticipationPlayerUrl: string;
  project: SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_survey_project;
  projectModuleProgresses: SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_survey_projectModuleProgresses[];
}

export interface SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_userAccount {
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

export interface SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation {
  __typename: "SurveyInvitation";
  id: string;
  createdAt: string;
  modifiedAt: string;
  token: string;
  email: string | null;
  surveyId: string;
  userAccountId: string | null;
  isOpenParticipation: boolean;
  participantData: SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_participantData | null;
  projectModuleProgresses: SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_projectModuleProgresses[];
  survey: SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_survey;
  userAccount: SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation_userAccount | null;
}

export interface SurveyParticipationInfoQuery_surveyParticipationInfo {
  __typename: "SurveyParticipationInfo";
  surveyInvitation: SurveyParticipationInfoQuery_surveyParticipationInfo_surveyInvitation;
  surveyParticipationStatus: SurveyParticipationStatus;
}

export interface SurveyParticipationInfoQuery {
  surveyParticipationInfo: SurveyParticipationInfoQuery_surveyParticipationInfo | null;
}

export interface SurveyParticipationInfoQueryVariables {
  token: string;
}
