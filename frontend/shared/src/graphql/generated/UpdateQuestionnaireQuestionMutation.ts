/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionnaireQuestionUpdate, QuestionType, MimeType, QuestionScoringType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateQuestionnaireQuestionMutation
// ====================================================

export interface UpdateQuestionnaireQuestionMutation_updateQuestionnaireQuestion_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateQuestionnaireQuestionMutation_updateQuestionnaireQuestion_answers {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface UpdateQuestionnaireQuestionMutation_updateQuestionnaireQuestion_freetextQuestionCodingCriteria {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface UpdateQuestionnaireQuestionMutation_updateQuestionnaireQuestion {
  __typename: "QuestionnaireQuestion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionType: QuestionType;
  questionnaireId: string;
  position: number;
  isAdditionalFreeTextAnswerEnabled: boolean;
  score: number;
  binaryFileId: string | null;
  binaryFile: UpdateQuestionnaireQuestionMutation_updateQuestionnaireQuestion_binaryFile | null;
  answers: UpdateQuestionnaireQuestionMutation_updateQuestionnaireQuestion_answers[];
  freetextQuestionCodingCriteria: UpdateQuestionnaireQuestionMutation_updateQuestionnaireQuestion_freetextQuestionCodingCriteria[];
  scoringType: QuestionScoringType;
}

export interface UpdateQuestionnaireQuestionMutation {
  updateQuestionnaireQuestion: UpdateQuestionnaireQuestionMutation_updateQuestionnaireQuestion;
}

export interface UpdateQuestionnaireQuestionMutationVariables {
  id: string;
  update: QuestionnaireQuestionUpdate;
}
