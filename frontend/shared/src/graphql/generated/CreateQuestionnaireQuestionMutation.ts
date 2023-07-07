/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionnaireQuestionCreation, QuestionType, MimeType, QuestionScoringType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateQuestionnaireQuestionMutation
// ====================================================

export interface CreateQuestionnaireQuestionMutation_createQuestionnaireQuestion_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateQuestionnaireQuestionMutation_createQuestionnaireQuestion_answers {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface CreateQuestionnaireQuestionMutation_createQuestionnaireQuestion_freetextQuestionCodingCriteria {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface CreateQuestionnaireQuestionMutation_createQuestionnaireQuestion {
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
  binaryFile: CreateQuestionnaireQuestionMutation_createQuestionnaireQuestion_binaryFile | null;
  answers: CreateQuestionnaireQuestionMutation_createQuestionnaireQuestion_answers[];
  freetextQuestionCodingCriteria: CreateQuestionnaireQuestionMutation_createQuestionnaireQuestion_freetextQuestionCodingCriteria[];
  scoringType: QuestionScoringType;
}

export interface CreateQuestionnaireQuestionMutation {
  createQuestionnaireQuestion: CreateQuestionnaireQuestionMutation_createQuestionnaireQuestion;
}

export interface CreateQuestionnaireQuestionMutationVariables {
  creation: QuestionnaireQuestionCreation;
}
