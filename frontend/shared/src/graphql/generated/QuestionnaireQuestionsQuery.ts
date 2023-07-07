/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionType, MimeType, QuestionScoringType } from "./globalTypes";

// ====================================================
// GraphQL query operation: QuestionnaireQuestionsQuery
// ====================================================

export interface QuestionnaireQuestionsQuery_questionnaireQuestions_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface QuestionnaireQuestionsQuery_questionnaireQuestions_answers {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface QuestionnaireQuestionsQuery_questionnaireQuestions_freetextQuestionCodingCriteria {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface QuestionnaireQuestionsQuery_questionnaireQuestions {
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
  binaryFile: QuestionnaireQuestionsQuery_questionnaireQuestions_binaryFile | null;
  answers: QuestionnaireQuestionsQuery_questionnaireQuestions_answers[];
  freetextQuestionCodingCriteria: QuestionnaireQuestionsQuery_questionnaireQuestions_freetextQuestionCodingCriteria[];
  scoringType: QuestionScoringType;
}

export interface QuestionnaireQuestionsQuery {
  questionnaireQuestions: QuestionnaireQuestionsQuery_questionnaireQuestions[];
}

export interface QuestionnaireQuestionsQueryVariables {
  questionnaireId: string;
}
