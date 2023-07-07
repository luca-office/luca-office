/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionType, MimeType, QuestionScoringType } from "./globalTypes";

// ====================================================
// GraphQL query operation: QuestionnaireQuestionQuery
// ====================================================

export interface QuestionnaireQuestionQuery_questionnaireQuestion_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface QuestionnaireQuestionQuery_questionnaireQuestion_answers {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface QuestionnaireQuestionQuery_questionnaireQuestion_freetextQuestionCodingCriteria {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface QuestionnaireQuestionQuery_questionnaireQuestion {
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
  binaryFile: QuestionnaireQuestionQuery_questionnaireQuestion_binaryFile | null;
  answers: QuestionnaireQuestionQuery_questionnaireQuestion_answers[];
  freetextQuestionCodingCriteria: QuestionnaireQuestionQuery_questionnaireQuestion_freetextQuestionCodingCriteria[];
  scoringType: QuestionScoringType;
}

export interface QuestionnaireQuestionQuery {
  questionnaireQuestion: QuestionnaireQuestionQuery_questionnaireQuestion | null;
}

export interface QuestionnaireQuestionQueryVariables {
  id: string;
}
