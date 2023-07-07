/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionnaireType } from "./globalTypes";

// ====================================================
// GraphQL fragment: QuestionnaireLightFragment
// ====================================================

export interface QuestionnaireLightFragment_author {
  __typename: "UserAccount";
  id: string;
  firstName: string;
  lastName: string;
}

export interface QuestionnaireLightFragment {
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
  author: QuestionnaireLightFragment_author;
  questionsCount: number;
}
