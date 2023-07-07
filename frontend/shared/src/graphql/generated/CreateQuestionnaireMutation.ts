/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionnaireCreation, QuestionnaireType, MimeType, Salutation, QuestionType, QuestionScoringType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateQuestionnaireMutation
// ====================================================

export interface CreateQuestionnaireMutation_createQuestionnaire_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateQuestionnaireMutation_createQuestionnaire_author {
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

export interface CreateQuestionnaireMutation_createQuestionnaire_questions_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateQuestionnaireMutation_createQuestionnaire_questions_answers {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface CreateQuestionnaireMutation_createQuestionnaire_questions_freetextQuestionCodingCriteria {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface CreateQuestionnaireMutation_createQuestionnaire_questions {
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
  binaryFile: CreateQuestionnaireMutation_createQuestionnaire_questions_binaryFile | null;
  answers: CreateQuestionnaireMutation_createQuestionnaire_questions_answers[];
  freetextQuestionCodingCriteria: CreateQuestionnaireMutation_createQuestionnaire_questions_freetextQuestionCodingCriteria[];
  scoringType: QuestionScoringType;
}

export interface CreateQuestionnaireMutation_createQuestionnaire {
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
  binaryFile: CreateQuestionnaireMutation_createQuestionnaire_binaryFile | null;
  authorId: string;
  author: CreateQuestionnaireMutation_createQuestionnaire_author;
  questionsCount: number;
  questions: CreateQuestionnaireMutation_createQuestionnaire_questions[];
}

export interface CreateQuestionnaireMutation {
  createQuestionnaire: CreateQuestionnaireMutation_createQuestionnaire;
}

export interface CreateQuestionnaireMutationVariables {
  creation: QuestionnaireCreation;
}
