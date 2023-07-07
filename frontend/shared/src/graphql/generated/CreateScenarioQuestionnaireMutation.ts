/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioQuestionnaireCreation, QuestionnaireType, MimeType, Salutation, QuestionType, QuestionScoringType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateScenarioQuestionnaireMutation
// ====================================================

export interface CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire_questionnaire_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire_questionnaire_author {
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

export interface CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire_questionnaire_questions_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire_questionnaire_questions_answers {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire_questionnaire_questions_freetextQuestionCodingCriteria {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire_questionnaire_questions {
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
  binaryFile: CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire_questionnaire_questions_binaryFile | null;
  answers: CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire_questionnaire_questions_answers[];
  freetextQuestionCodingCriteria: CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire_questionnaire_questions_freetextQuestionCodingCriteria[];
  scoringType: QuestionScoringType;
}

export interface CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire_questionnaire {
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
  binaryFile: CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire_questionnaire_binaryFile | null;
  authorId: string;
  author: CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire_questionnaire_author;
  questionsCount: number;
  questions: CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire_questionnaire_questions[];
}

export interface CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire {
  __typename: "ScenarioQuestionnaire";
  scenarioId: string;
  questionnaireId: string;
  activationDelayInSeconds: number;
  questionnaire: CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire_questionnaire;
}

export interface CreateScenarioQuestionnaireMutation {
  createScenarioQuestionnaire: CreateScenarioQuestionnaireMutation_createScenarioQuestionnaire;
}

export interface CreateScenarioQuestionnaireMutationVariables {
  creation: ScenarioQuestionnaireCreation;
}
