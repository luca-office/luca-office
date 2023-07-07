/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionnaireType } from "./globalTypes";

// ====================================================
// GraphQL query operation: QuestionnairesLightQuery
// ====================================================

export interface QuestionnairesLightQuery_questionnaires_author {
  __typename: "UserAccount";
  id: string;
  firstName: string;
  lastName: string;
}

export interface QuestionnairesLightQuery_questionnaires {
  __typename: "Questionnaire";
  id: string;
  createdAt: string;
  modifiedAt: string;
  title: string;
  description: string;
  maxDurationInSeconds: number | null;
  questionnaireType: QuestionnaireType;
  finalizedAt: string | null;
  publishedAt: string | null;
  author: QuestionnairesLightQuery_questionnaires_author;
  questionsCount: number;
}

export interface QuestionnairesLightQuery {
  questionnaires: QuestionnairesLightQuery_questionnaires[];
}

export interface QuestionnairesLightQueryVariables {
  isRuntimeSurvey: boolean;
}
