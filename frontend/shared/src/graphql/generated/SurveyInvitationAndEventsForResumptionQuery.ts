/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation, ProjectModuleProgressType, AuthenticationType, SurveyExecutionType, UsageField, SurveyEventType } from "./globalTypes";

// ====================================================
// GraphQL query operation: SurveyInvitationAndEventsForResumptionQuery
// ====================================================

export interface SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_participantData {
  __typename: "ParticipantData";
  firstName: string;
  lastName: string;
  salutation: Salutation;
}

export interface SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_projectModuleProgresses {
  __typename: "ParticipantProjectModuleProgress";
  scenarioId: string | null;
  questionnaireId: string | null;
  status: ProjectModuleProgressType;
  questionsInProgressCount: number | null;
  requiredDocumentsCount: number | null;
  openedRequiredDocumentsCount: number | null;
}

export interface SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_survey_manualPeriod {
  __typename: "Period";
  start: string | null;
  end: string | null;
}

export interface SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_survey_project_author {
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

export interface SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_survey_project_surveys {
  __typename: "Survey";
  id: string;
  isTestSurvey: boolean;
}

export interface SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_survey_project {
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
  author: SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_survey_project_author;
  maxDurationInSeconds: number;
  isFinalized: boolean;
  surveys: SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_survey_project_surveys[];
}

export interface SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_survey_projectModuleProgresses {
  __typename: "ProjectModuleProgress";
  projectModuleId: string;
  inProgressParticipationsCount: number;
  completedParticipationsCount: number;
}

export interface SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_survey {
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
  manualPeriod: SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_survey_manualPeriod | null;
  isOpenParticipationEnabled: boolean;
  openParticipationPlayerUrl: string;
  project: SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_survey_project;
  projectModuleProgresses: SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_survey_projectModuleProgresses[];
}

export interface SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_userAccount {
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

export interface SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation {
  __typename: "SurveyInvitation";
  id: string;
  createdAt: string;
  modifiedAt: string;
  token: string;
  email: string | null;
  surveyId: string;
  userAccountId: string | null;
  isOpenParticipation: boolean;
  participantData: SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_participantData | null;
  projectModuleProgresses: SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_projectModuleProgresses[];
  survey: SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_survey;
  userAccount: SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation_userAccount | null;
}

export interface SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyEventsForLatestInProgressProjectModule_surveyEvents {
  __typename: "SurveyEvent";
  timestamp: string;
  eventType: SurveyEventType;
  data: string | null;
  surveyId: string;
  index: number;
  invitationId: string | null;
}

export interface SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyEventsForLatestInProgressProjectModule {
  __typename: "ProjectModuleSurveyEvents";
  scenarioId: string | null;
  questionnaireId: string | null;
  surveyEvents: SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyEventsForLatestInProgressProjectModule_surveyEvents[];
}

export interface SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption {
  __typename: "SurveyInvitationAndEvents";
  surveyInvitation: SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyInvitation;
  surveyEventsForLatestInProgressProjectModule: SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption_surveyEventsForLatestInProgressProjectModule | null;
}

export interface SurveyInvitationAndEventsForResumptionQuery {
  surveyInvitationAndEventsForResumption: SurveyInvitationAndEventsForResumptionQuery_surveyInvitationAndEventsForResumption | null;
}

export interface SurveyInvitationAndEventsForResumptionQueryVariables {
  token: string;
}
