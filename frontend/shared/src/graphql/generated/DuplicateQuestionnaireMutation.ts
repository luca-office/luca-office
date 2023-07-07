/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionnaireType, MimeType, Salutation, QuestionType, QuestionScoringType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DuplicateQuestionnaireMutation
// ====================================================

export interface DuplicateQuestionnaireMutation_duplicateQuestionnaire_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface DuplicateQuestionnaireMutation_duplicateQuestionnaire_author {
  __typename: "UserAccount";
  id: string;
  createdAt: string;
  modifiedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  salutation: Salutation;
  mayAdministrateUserAccounts: boolean;
  mayAdministrateRScripts: boolean;
  mayArchive: boolean;
  mayFinalizeWithoutPublishing: boolean;
}

export interface DuplicateQuestionnaireMutation_duplicateQuestionnaire_questions_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface DuplicateQuestionnaireMutation_duplicateQuestionnaire_questions_answers {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface DuplicateQuestionnaireMutation_duplicateQuestionnaire_questions_freetextQuestionCodingCriteria {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface DuplicateQuestionnaireMutation_duplicateQuestionnaire_questions {
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
  binaryFile: DuplicateQuestionnaireMutation_duplicateQuestionnaire_questions_binaryFile | null;
  answers: DuplicateQuestionnaireMutation_duplicateQuestionnaire_questions_answers[];
  freetextQuestionCodingCriteria: DuplicateQuestionnaireMutation_duplicateQuestionnaire_questions_freetextQuestionCodingCriteria[];
  scoringType: QuestionScoringType;
}

export interface DuplicateQuestionnaireMutation_duplicateQuestionnaire {
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
  binaryFileId: string | null;
  binaryFile: DuplicateQuestionnaireMutation_duplicateQuestionnaire_binaryFile | null;
  authorId: string;
  author: DuplicateQuestionnaireMutation_duplicateQuestionnaire_author;
  questionsCount: number;
  questions: DuplicateQuestionnaireMutation_duplicateQuestionnaire_questions[];
}

export interface DuplicateQuestionnaireMutation {
  duplicateQuestionnaire: DuplicateQuestionnaireMutation_duplicateQuestionnaire;
}

export interface DuplicateQuestionnaireMutationVariables {
  id: string;
}
