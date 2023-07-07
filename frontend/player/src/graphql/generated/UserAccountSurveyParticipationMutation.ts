/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UserAccountSurveyParticipationMutation
// ====================================================

export interface UserAccountSurveyParticipationMutation_userAccountSurveyParticipation_userAccount {
  __typename: "UserAccount";
  firstName: string;
  lastName: string;
  salutation: Salutation;
}

export interface UserAccountSurveyParticipationMutation_userAccountSurveyParticipation {
  __typename: "SurveyInvitation";
  userAccountId: string | null;
  userAccount: UserAccountSurveyParticipationMutation_userAccountSurveyParticipation_userAccount | null;
}

export interface UserAccountSurveyParticipationMutation {
  userAccountSurveyParticipation: UserAccountSurveyParticipationMutation_userAccountSurveyParticipation;
}

export interface UserAccountSurveyParticipationMutationVariables {
  surveyInvitationId: string;
  email: string;
  password: string;
}
