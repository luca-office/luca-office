/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation, ProjectModuleProgressType } from "./globalTypes";

// ====================================================
// GraphQL fragment: SurveyInvitationLightFragment
// ====================================================

export interface SurveyInvitationLightFragment_participantData {
  __typename: "ParticipantData";
  firstName: string;
  lastName: string;
  salutation: Salutation;
}

export interface SurveyInvitationLightFragment_projectModuleProgresses {
  __typename: "ParticipantProjectModuleProgress";
  scenarioId: string | null;
  questionnaireId: string | null;
  status: ProjectModuleProgressType;
  questionsInProgressCount: number | null;
  requiredDocumentsCount: number | null;
  openedRequiredDocumentsCount: number | null;
}

export interface SurveyInvitationLightFragment_survey {
  __typename: "Survey";
  id: string;
  projectId: string;
}

export interface SurveyInvitationLightFragment_userAccount {
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

export interface SurveyInvitationLightFragment {
  __typename: "SurveyInvitation";
  id: string;
  createdAt: string;
  modifiedAt: string;
  token: string;
  email: string | null;
  surveyId: string;
  userAccountId: string | null;
  isOpenParticipation: boolean;
  participantData: SurveyInvitationLightFragment_participantData | null;
  projectModuleProgresses: SurveyInvitationLightFragment_projectModuleProgresses[];
  survey: SurveyInvitationLightFragment_survey;
  userAccount: SurveyInvitationLightFragment_userAccount | null;
}
