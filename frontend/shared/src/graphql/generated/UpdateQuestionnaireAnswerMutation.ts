/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionnaireAnswerUpdate } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateQuestionnaireAnswerMutation
// ====================================================

export interface UpdateQuestionnaireAnswerMutation_updateQuestionnaireAnswer {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface UpdateQuestionnaireAnswerMutation {
  updateQuestionnaireAnswer: UpdateQuestionnaireAnswerMutation_updateQuestionnaireAnswer;
}

export interface UpdateQuestionnaireAnswerMutationVariables {
  id: string;
  update: QuestionnaireAnswerUpdate;
}
