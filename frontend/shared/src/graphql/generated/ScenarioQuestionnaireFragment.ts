/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionnaireType, MimeType, Salutation, QuestionType, QuestionScoringType } from "./globalTypes";

// ====================================================
// GraphQL fragment: ScenarioQuestionnaireFragment
// ====================================================

export interface ScenarioQuestionnaireFragment_questionnaire_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ScenarioQuestionnaireFragment_questionnaire_author {
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

export interface ScenarioQuestionnaireFragment_questionnaire_questions_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ScenarioQuestionnaireFragment_questionnaire_questions_answers {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface ScenarioQuestionnaireFragment_questionnaire_questions_freetextQuestionCodingCriteria {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface ScenarioQuestionnaireFragment_questionnaire_questions {
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
  binaryFile: ScenarioQuestionnaireFragment_questionnaire_questions_binaryFile | null;
  answers: ScenarioQuestionnaireFragment_questionnaire_questions_answers[];
  freetextQuestionCodingCriteria: ScenarioQuestionnaireFragment_questionnaire_questions_freetextQuestionCodingCriteria[];
  scoringType: QuestionScoringType;
}

export interface ScenarioQuestionnaireFragment_questionnaire {
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
  binaryFile: ScenarioQuestionnaireFragment_questionnaire_binaryFile | null;
  authorId: string;
  author: ScenarioQuestionnaireFragment_questionnaire_author;
  questionsCount: number;
  questions: ScenarioQuestionnaireFragment_questionnaire_questions[];
}

export interface ScenarioQuestionnaireFragment {
  __typename: "ScenarioQuestionnaire";
  scenarioId: string;
  questionnaireId: string;
  activationDelayInSeconds: number;
  questionnaire: ScenarioQuestionnaireFragment_questionnaire;
}
