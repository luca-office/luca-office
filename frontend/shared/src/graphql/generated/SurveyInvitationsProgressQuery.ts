/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProjectModuleProgressType, Salutation } from "./globalTypes";

// ====================================================
// GraphQL query operation: SurveyInvitationsProgressQuery
// ====================================================

export interface SurveyInvitationsProgressQuery_surveyInvitations_projectModuleProgresses {
  __typename: "ParticipantProjectModuleProgress";
  scenarioId: string | null;
  questionnaireId: string | null;
  status: ProjectModuleProgressType;
  questionsInProgressCount: number | null;
  requiredDocumentsCount: number | null;
  openedRequiredDocumentsCount: number | null;
}

export interface SurveyInvitationsProgressQuery_surveyInvitations_participantData {
  __typename: "ParticipantData";
  firstName: string;
  lastName: string;
  salutation: Salutation;
}

export interface SurveyInvitationsProgressQuery_surveyInvitations {
  __typename: "SurveyInvitation";
  id: string;
  token: string;
  email: string | null;
  projectModuleProgresses: SurveyInvitationsProgressQuery_surveyInvitations_projectModuleProgresses[];
  participantData: SurveyInvitationsProgressQuery_surveyInvitations_participantData | null;
}

export interface SurveyInvitationsProgressQuery {
  surveyInvitations: SurveyInvitationsProgressQuery_surveyInvitations[];
}

export interface SurveyInvitationsProgressQueryVariables {
  surveyId: string;
}
