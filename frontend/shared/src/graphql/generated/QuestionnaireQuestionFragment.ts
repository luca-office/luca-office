/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionType, MimeType, QuestionScoringType } from "./globalTypes";

// ====================================================
// GraphQL fragment: QuestionnaireQuestionFragment
// ====================================================

export interface QuestionnaireQuestionFragment_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface QuestionnaireQuestionFragment_answers {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface QuestionnaireQuestionFragment_freetextQuestionCodingCriteria {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface QuestionnaireQuestionFragment {
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
  binaryFile: QuestionnaireQuestionFragment_binaryFile | null;
  answers: QuestionnaireQuestionFragment_answers[];
  freetextQuestionCodingCriteria: QuestionnaireQuestionFragment_freetextQuestionCodingCriteria[];
  scoringType: QuestionScoringType;
}
