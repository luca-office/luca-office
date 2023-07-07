/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionnaireAnswerCreation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateQuestionnaireAnswerMutation
// ====================================================

export interface CreateQuestionnaireAnswerMutation_createQuestionnaireAnswer {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface CreateQuestionnaireAnswerMutation {
  createQuestionnaireAnswer: CreateQuestionnaireAnswerMutation_createQuestionnaireAnswer;
}

export interface CreateQuestionnaireAnswerMutationVariables {
  creation: QuestionnaireAnswerCreation;
}
