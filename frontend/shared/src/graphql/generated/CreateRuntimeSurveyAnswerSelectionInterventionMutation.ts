/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RuntimeSurveyAnswerSelectionInterventionCreation, InterventionType, Relevance, EmailDirectory, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateRuntimeSurveyAnswerSelectionInterventionMutation
// ====================================================

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_FileOpeningIntervention_interventionEmail {
  __typename: "Email";
  id: string;
  sender: string | null;
  ccRecipients: string[];
  isInitiallyRead: boolean;
  relevance: Relevance;
  message: string;
  subject: string;
  directory: EmailDirectory;
  createdAt: string;
  modifiedAt: string;
  scenarioId: string;
  recipient: string | null;
  receptionDelayInSeconds: number;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_FileOpeningIntervention_file {
  __typename: "File";
  name: string;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_FileOpeningIntervention {
  __typename: "FileOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_FileOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  fileId: string;
  file: CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_FileOpeningIntervention_file;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_EmailOpeningIntervention_interventionEmail {
  __typename: "Email";
  id: string;
  sender: string | null;
  ccRecipients: string[];
  isInitiallyRead: boolean;
  relevance: Relevance;
  message: string;
  subject: string;
  directory: EmailDirectory;
  createdAt: string;
  modifiedAt: string;
  scenarioId: string;
  recipient: string | null;
  receptionDelayInSeconds: number;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_EmailOpeningIntervention_email {
  __typename: "Email";
  sender: string | null;
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_EmailOpeningIntervention {
  __typename: "EmailOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_EmailOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  emailId: string;
  email: CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_EmailOpeningIntervention_email;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_NotesContentIntervention_interventionEmail {
  __typename: "Email";
  id: string;
  sender: string | null;
  ccRecipients: string[];
  isInitiallyRead: boolean;
  relevance: Relevance;
  message: string;
  subject: string;
  directory: EmailDirectory;
  createdAt: string;
  modifiedAt: string;
  scenarioId: string;
  recipient: string | null;
  receptionDelayInSeconds: number;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_NotesContentIntervention {
  __typename: "NotesContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_NotesContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_SpreadsheetCellContentIntervention_interventionEmail {
  __typename: "Email";
  id: string;
  sender: string | null;
  ccRecipients: string[];
  isInitiallyRead: boolean;
  relevance: Relevance;
  message: string;
  subject: string;
  directory: EmailDirectory;
  createdAt: string;
  modifiedAt: string;
  scenarioId: string;
  recipient: string | null;
  receptionDelayInSeconds: number;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_SpreadsheetCellContentIntervention_file {
  __typename: "File";
  name: string;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_SpreadsheetCellContentIntervention {
  __typename: "SpreadsheetCellContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_SpreadsheetCellContentIntervention_interventionEmail;
  isNegated: boolean;
  value: string;
  spreadsheetRowIndex: number;
  spreadsheetId: string;
  spreadsheetColumnIndex: number;
  timeOffsetInSeconds: number;
  fileId: string;
  file: CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_SpreadsheetCellContentIntervention_file;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail {
  __typename: "Email";
  id: string;
  sender: string | null;
  ccRecipients: string[];
  isInitiallyRead: boolean;
  relevance: Relevance;
  message: string;
  subject: string;
  directory: EmailDirectory;
  createdAt: string;
  modifiedAt: string;
  scenarioId: string;
  recipient: string | null;
  receptionDelayInSeconds: number;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_RuntimeSurveyAnswerSelectionIntervention_answer {
  __typename: "QuestionnaireAnswer";
  id: string;
  text: string;
  questionId: string;
  position: number;
  isCorrect: boolean;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_RuntimeSurveyAnswerSelectionIntervention {
  __typename: "RuntimeSurveyAnswerSelectionIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail;
  answerId: string;
  isNegated: boolean;
  answer: CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_RuntimeSurveyAnswerSelectionIntervention_answer;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_ErpRowOpeningIntervention_interventionEmail {
  __typename: "Email";
  id: string;
  sender: string | null;
  ccRecipients: string[];
  isInitiallyRead: boolean;
  relevance: Relevance;
  message: string;
  subject: string;
  directory: EmailDirectory;
  createdAt: string;
  modifiedAt: string;
  scenarioId: string;
  recipient: string | null;
  receptionDelayInSeconds: number;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_ErpRowOpeningIntervention {
  __typename: "ErpRowOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_ErpRowOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_TextDocumentContentIntervention_interventionEmail {
  __typename: "Email";
  id: string;
  sender: string | null;
  ccRecipients: string[];
  isInitiallyRead: boolean;
  relevance: Relevance;
  message: string;
  subject: string;
  directory: EmailDirectory;
  createdAt: string;
  modifiedAt: string;
  scenarioId: string;
  recipient: string | null;
  receptionDelayInSeconds: number;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_TextDocumentContentIntervention_file {
  __typename: "File";
  name: string;
  id: string;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_TextDocumentContentIntervention {
  __typename: "TextDocumentContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_TextDocumentContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
  textDocumentId: string;
  file: CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_TextDocumentContentIntervention_file;
}

export type CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention = CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_FileOpeningIntervention | CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_EmailOpeningIntervention | CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_NotesContentIntervention | CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_SpreadsheetCellContentIntervention | CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_RuntimeSurveyAnswerSelectionIntervention | CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_ErpRowOpeningIntervention | CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention_TextDocumentContentIntervention;

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutation {
  createRuntimeSurveyAnswerSelectionIntervention: CreateRuntimeSurveyAnswerSelectionInterventionMutation_createRuntimeSurveyAnswerSelectionIntervention;
}

export interface CreateRuntimeSurveyAnswerSelectionInterventionMutationVariables {
  creation: RuntimeSurveyAnswerSelectionInterventionCreation;
}
