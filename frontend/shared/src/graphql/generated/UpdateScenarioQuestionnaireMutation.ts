/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioQuestionnaireUpdate, QuestionnaireType, MimeType, Salutation, QuestionType, QuestionScoringType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateScenarioQuestionnaireMutation
// ====================================================

export interface UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire_questionnaire_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire_questionnaire_author {
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

export interface UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire_questionnaire_questions_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire_questionnaire_questions_answers {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire_questionnaire_questions_freetextQuestionCodingCriteria {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire_questionnaire_questions {
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
  binaryFile: UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire_questionnaire_questions_binaryFile | null;
  answers: UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire_questionnaire_questions_answers[];
  freetextQuestionCodingCriteria: UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire_questionnaire_questions_freetextQuestionCodingCriteria[];
  scoringType: QuestionScoringType;
}

export interface UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire_questionnaire {
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
  binaryFile: UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire_questionnaire_binaryFile | null;
  authorId: string;
  author: UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire_questionnaire_author;
  questionsCount: number;
  questions: UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire_questionnaire_questions[];
}

export interface UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire {
  __typename: "ScenarioQuestionnaire";
  scenarioId: string;
  questionnaireId: string;
  activationDelayInSeconds: number;
  questionnaire: UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire_questionnaire;
}

export interface UpdateScenarioQuestionnaireMutation {
  updateScenarioQuestionnaire: UpdateScenarioQuestionnaireMutation_updateScenarioQuestionnaire;
}

export interface UpdateScenarioQuestionnaireMutationVariables {
  scenarioId: string;
  questionnaireId: string;
  update: ScenarioQuestionnaireUpdate;
}
