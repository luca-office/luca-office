/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation, ProjectModuleProgressType } from "./globalTypes";

// ====================================================
// GraphQL query operation: SurveyInvitationsQuery
// ====================================================

export interface SurveyInvitationsQuery_surveyInvitations_participantData {
  __typename: "ParticipantData";
  firstName: string;
  lastName: string;
  salutation: Salutation;
}

export interface SurveyInvitationsQuery_surveyInvitations_projectModuleProgresses {
  __typename: "ParticipantProjectModuleProgress";
  scenarioId: string | null;
  questionnaireId: string | null;
  status: ProjectModuleProgressType;
  questionsInProgressCount: number | null;
  requiredDocumentsCount: number | null;
  openedRequiredDocumentsCount: number | null;
}

export interface SurveyInvitationsQuery_surveyInvitations_survey {
  __typename: "Survey";
  id: string;
  projectId: string;
}

export interface SurveyInvitationsQuery_surveyInvitations_userAccount {
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

export interface SurveyInvitationsQuery_surveyInvitations {
  __typename: "SurveyInvitation";
  id: string;
  createdAt: string;
  modifiedAt: string;
  token: string;
  email: string | null;
  surveyId: string;
  userAccountId: string | null;
  isOpenParticipation: boolean;
  participantData: SurveyInvitationsQuery_surveyInvitations_participantData | null;
  projectModuleProgresses: SurveyInvitationsQuery_surveyInvitations_projectModuleProgresses[];
  survey: SurveyInvitationsQuery_surveyInvitations_survey;
  userAccount: SurveyInvitationsQuery_surveyInvitations_userAccount | null;
}

export interface SurveyInvitationsQuery {
  surveyInvitations: SurveyInvitationsQuery_surveyInvitations[];
}

export interface SurveyInvitationsQueryVariables {
  surveyId: string;
}
