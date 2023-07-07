/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RepositionQuestionnaireAnswerMutation
// ====================================================

export interface RepositionQuestionnaireAnswerMutation_repositionQuestionnaireAnswer {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface RepositionQuestionnaireAnswerMutation {
  repositionQuestionnaireAnswer: RepositionQuestionnaireAnswerMutation_repositionQuestionnaireAnswer;
}

export interface RepositionQuestionnaireAnswerMutationVariables {
  id: string;
  predecessorId?: string | null;
}
