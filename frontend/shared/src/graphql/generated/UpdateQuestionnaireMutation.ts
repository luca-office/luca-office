/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionnaireUpdate, QuestionnaireType, MimeType, Salutation, QuestionType, QuestionScoringType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateQuestionnaireMutation
// ====================================================

export interface UpdateQuestionnaireMutation_updateQuestionnaire_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateQuestionnaireMutation_updateQuestionnaire_author {
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

export interface UpdateQuestionnaireMutation_updateQuestionnaire_questions_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateQuestionnaireMutation_updateQuestionnaire_questions_answers {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface UpdateQuestionnaireMutation_updateQuestionnaire_questions_freetextQuestionCodingCriteria {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface UpdateQuestionnaireMutation_updateQuestionnaire_questions {
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
  binaryFile: UpdateQuestionnaireMutation_updateQuestionnaire_questions_binaryFile | null;
  answers: UpdateQuestionnaireMutation_updateQuestionnaire_questions_answers[];
  freetextQuestionCodingCriteria: UpdateQuestionnaireMutation_updateQuestionnaire_questions_freetextQuestionCodingCriteria[];
  scoringType: QuestionScoringType;
}

export interface UpdateQuestionnaireMutation_updateQuestionnaire {
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
  binaryFile: UpdateQuestionnaireMutation_updateQuestionnaire_binaryFile | null;
  authorId: string;
  author: UpdateQuestionnaireMutation_updateQuestionnaire_author;
  questionsCount: number;
  questions: UpdateQuestionnaireMutation_updateQuestionnaire_questions[];
}

export interface UpdateQuestionnaireMutation {
  updateQuestionnaire: UpdateQuestionnaireMutation_updateQuestionnaire;
}

export interface UpdateQuestionnaireMutationVariables {
  id: string;
  update: QuestionnaireUpdate;
}
