/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation, ProjectModuleProgressType, AuthenticationType, SurveyExecutionType, UsageField } from "./globalTypes";

// ====================================================
// GraphQL fragment: SurveyInvitationFragment
// ====================================================

export interface SurveyInvitationFragment_participantData {
  __typename: "ParticipantData";
  firstName: string;
  lastName: string;
  salutation: Salutation;
}

export interface SurveyInvitationFragment_projectModuleProgresses {
  __typename: "ParticipantProjectModuleProgress";
  scenarioId: string | null;
  questionnaireId: string | null;
  status: ProjectModuleProgressType;
  questionsInProgressCount: number | null;
  requiredDocumentsCount: number | null;
  openedRequiredDocumentsCount: number | null;
}

export interface SurveyInvitationFragment_survey_manualPeriod {
  __typename: "Period";
  start: string | null;
  end: string | null;
}

export interface SurveyInvitationFragment_survey_project_author {
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

export interface SurveyInvitationFragment_survey_project_surveys {
  __typename: "Survey";
  id: string;
  isTestSurvey: boolean;
}

export interface SurveyInvitationFragment_survey_project {
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
  author: SurveyInvitationFragment_survey_project_author;
  maxDurationInSeconds: number;
  isFinalized: boolean;
  surveys: SurveyInvitationFragment_survey_project_surveys[];
}

export interface SurveyInvitationFragment_survey_projectModuleProgresses {
  __typename: "ProjectModuleProgress";
  projectModuleId: string;
  inProgressParticipationsCount: number;
  completedParticipationsCount: number;
}

export interface SurveyInvitationFragment_survey {
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
  manualPeriod: SurveyInvitationFragment_survey_manualPeriod | null;
  isOpenParticipationEnabled: boolean;
  openParticipationPlayerUrl: string;
  project: SurveyInvitationFragment_survey_project;
  projectModuleProgresses: SurveyInvitationFragment_survey_projectModuleProgresses[];
}

export interface SurveyInvitationFragment_userAccount {
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

export interface SurveyInvitationFragment {
  __typename: "SurveyInvitation";
  id: string;
  createdAt: string;
  modifiedAt: string;
  token: string;
  email: string | null;
  surveyId: string;
  userAccountId: string | null;
  isOpenParticipation: boolean;
  participantData: SurveyInvitationFragment_participantData | null;
  projectModuleProgresses: SurveyInvitationFragment_projectModuleProgresses[];
  survey: SurveyInvitationFragment_survey;
  userAccount: SurveyInvitationFragment_userAccount | null;
}
