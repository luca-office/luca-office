/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionType, MimeType, QuestionScoringType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: RepositionQuestionnaireQuestionMutation
// ====================================================

export interface RepositionQuestionnaireQuestionMutation_repositionQuestionnaireQuestion_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface RepositionQuestionnaireQuestionMutation_repositionQuestionnaireQuestion_answers {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface RepositionQuestionnaireQuestionMutation_repositionQuestionnaireQuestion_freetextQuestionCodingCriteria {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface RepositionQuestionnaireQuestionMutation_repositionQuestionnaireQuestion {
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
  binaryFile: RepositionQuestionnaireQuestionMutation_repositionQuestionnaireQuestion_binaryFile | null;
  answers: RepositionQuestionnaireQuestionMutation_repositionQuestionnaireQuestion_answers[];
  freetextQuestionCodingCriteria: RepositionQuestionnaireQuestionMutation_repositionQuestionnaireQuestion_freetextQuestionCodingCriteria[];
  scoringType: QuestionScoringType;
}

export interface RepositionQuestionnaireQuestionMutation {
  repositionQuestionnaireQuestion: RepositionQuestionnaireQuestionMutation_repositionQuestionnaireQuestion;
}

export interface RepositionQuestionnaireQuestionMutationVariables {
  id: string;
  predecessorId?: string | null;
}
