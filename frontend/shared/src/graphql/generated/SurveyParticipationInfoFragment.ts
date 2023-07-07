/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation, ProjectModuleProgressType, AuthenticationType, SurveyExecutionType, UsageField, SurveyParticipationStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: SurveyParticipationInfoFragment
// ====================================================

export interface SurveyParticipationInfoFragment_surveyInvitation_participantData {
  __typename: "ParticipantData";
  firstName: string;
  lastName: string;
  salutation: Salutation;
}

export interface SurveyParticipationInfoFragment_surveyInvitation_projectModuleProgresses {
  __typename: "ParticipantProjectModuleProgress";
  scenarioId: string | null;
  questionnaireId: string | null;
  status: ProjectModuleProgressType;
  questionsInProgressCount: number | null;
  requiredDocumentsCount: number | null;
  openedRequiredDocumentsCount: number | null;
}

export interface SurveyParticipationInfoFragment_surveyInvitation_survey_manualPeriod {
  __typename: "Period";
  start: string | null;
  end: string | null;
}

export interface SurveyParticipationInfoFragment_surveyInvitation_survey_project_author {
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

export interface SurveyParticipationInfoFragment_surveyInvitation_survey_project_surveys {
  __typename: "Survey";
  id: string;
  isTestSurvey: boolean;
}

export interface SurveyParticipationInfoFragment_surveyInvitation_survey_project {
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
  author: SurveyParticipationInfoFragment_surveyInvitation_survey_project_author;
  maxDurationInSeconds: number;
  isFinalized: boolean;
  surveys: SurveyParticipationInfoFragment_surveyInvitation_survey_project_surveys[];
}

export interface SurveyParticipationInfoFragment_surveyInvitation_survey_projectModuleProgresses {
  __typename: "ProjectModuleProgress";
  projectModuleId: string;
  inProgressParticipationsCount: number;
  completedParticipationsCount: number;
}

export interface SurveyParticipationInfoFragment_surveyInvitation_survey {
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
  manualPeriod: SurveyParticipationInfoFragment_surveyInvitation_survey_manualPeriod | null;
  isOpenParticipationEnabled: boolean;
  openParticipationPlayerUrl: string;
  project: SurveyParticipationInfoFragment_surveyInvitation_survey_project;
  projectModuleProgresses: SurveyParticipationInfoFragment_surveyInvitation_survey_projectModuleProgresses[];
}

export interface SurveyParticipationInfoFragment_surveyInvitation_userAccount {
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

export interface SurveyParticipationInfoFragment_surveyInvitation {
  __typename: "SurveyInvitation";
  id: string;
  createdAt: string;
  modifiedAt: string;
  token: string;
  email: string | null;
  surveyId: string;
  userAccountId: string | null;
  isOpenParticipation: boolean;
  participantData: SurveyParticipationInfoFragment_surveyInvitation_participantData | null;
  projectModuleProgresses: SurveyParticipationInfoFragment_surveyInvitation_projectModuleProgresses[];
  survey: SurveyParticipationInfoFragment_surveyInvitation_survey;
  userAccount: SurveyParticipationInfoFragment_surveyInvitation_userAccount | null;
}

export interface SurveyParticipationInfoFragment {
  __typename: "SurveyParticipationInfo";
  surveyInvitation: SurveyParticipationInfoFragment_surveyInvitation;
  surveyParticipationStatus: SurveyParticipationStatus;
}
