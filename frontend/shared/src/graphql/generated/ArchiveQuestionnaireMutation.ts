/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionnaireType, MimeType, Salutation, QuestionType, QuestionScoringType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ArchiveQuestionnaireMutation
// ====================================================

export interface ArchiveQuestionnaireMutation_archiveQuestionnaire_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ArchiveQuestionnaireMutation_archiveQuestionnaire_author {
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

export interface ArchiveQuestionnaireMutation_archiveQuestionnaire_questions_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ArchiveQuestionnaireMutation_archiveQuestionnaire_questions_answers {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface ArchiveQuestionnaireMutation_archiveQuestionnaire_questions_freetextQuestionCodingCriteria {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface ArchiveQuestionnaireMutation_archiveQuestionnaire_questions {
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
  binaryFile: ArchiveQuestionnaireMutation_archiveQuestionnaire_questions_binaryFile | null;
  answers: ArchiveQuestionnaireMutation_archiveQuestionnaire_questions_answers[];
  freetextQuestionCodingCriteria: ArchiveQuestionnaireMutation_archiveQuestionnaire_questions_freetextQuestionCodingCriteria[];
  scoringType: QuestionScoringType;
}

export interface ArchiveQuestionnaireMutation_archiveQuestionnaire {
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
  binaryFile: ArchiveQuestionnaireMutation_archiveQuestionnaire_binaryFile | null;
  authorId: string;
  author: ArchiveQuestionnaireMutation_archiveQuestionnaire_author;
  questionsCount: number;
  questions: ArchiveQuestionnaireMutation_archiveQuestionnaire_questions[];
}

export interface ArchiveQuestionnaireMutation {
  archiveQuestionnaire: ArchiveQuestionnaireMutation_archiveQuestionnaire;
}

export interface ArchiveQuestionnaireMutationVariables {
  id: string;
}
