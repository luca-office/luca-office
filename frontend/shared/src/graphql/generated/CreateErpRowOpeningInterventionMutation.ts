/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpRowOpeningInterventionCreation, InterventionType, Relevance, EmailDirectory, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateErpRowOpeningInterventionMutation
// ====================================================

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_FileOpeningIntervention_interventionEmail {
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

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_FileOpeningIntervention_file {
  __typename: "File";
  name: string;
}

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_FileOpeningIntervention {
  __typename: "FileOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_FileOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  fileId: string;
  file: CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_FileOpeningIntervention_file;
}

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_EmailOpeningIntervention_interventionEmail {
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

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_EmailOpeningIntervention_email {
  __typename: "Email";
  sender: string | null;
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
}

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_EmailOpeningIntervention {
  __typename: "EmailOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_EmailOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  emailId: string;
  email: CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_EmailOpeningIntervention_email;
}

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_NotesContentIntervention_interventionEmail {
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

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_NotesContentIntervention {
  __typename: "NotesContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_NotesContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
}

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_SpreadsheetCellContentIntervention_interventionEmail {
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

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_SpreadsheetCellContentIntervention_file {
  __typename: "File";
  name: string;
}

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_SpreadsheetCellContentIntervention {
  __typename: "SpreadsheetCellContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_SpreadsheetCellContentIntervention_interventionEmail;
  isNegated: boolean;
  value: string;
  spreadsheetRowIndex: number;
  spreadsheetId: string;
  spreadsheetColumnIndex: number;
  timeOffsetInSeconds: number;
  fileId: string;
  file: CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_SpreadsheetCellContentIntervention_file;
}

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail {
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

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_answer {
  __typename: "QuestionnaireAnswer";
  id: string;
  text: string;
  questionId: string;
  position: number;
  isCorrect: boolean;
}

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention {
  __typename: "RuntimeSurveyAnswerSelectionIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail;
  answerId: string;
  isNegated: boolean;
  answer: CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_answer;
}

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_ErpRowOpeningIntervention_interventionEmail {
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

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_ErpRowOpeningIntervention {
  __typename: "ErpRowOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_ErpRowOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_TextDocumentContentIntervention_interventionEmail {
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

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_TextDocumentContentIntervention_file {
  __typename: "File";
  name: string;
  id: string;
}

export interface CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_TextDocumentContentIntervention {
  __typename: "TextDocumentContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_TextDocumentContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
  textDocumentId: string;
  file: CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_TextDocumentContentIntervention_file;
}

export type CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention = CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_FileOpeningIntervention | CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_EmailOpeningIntervention | CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_NotesContentIntervention | CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_SpreadsheetCellContentIntervention | CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention | CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_ErpRowOpeningIntervention | CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention_TextDocumentContentIntervention;

export interface CreateErpRowOpeningInterventionMutation {
  createErpRowOpeningIntervention: CreateErpRowOpeningInterventionMutation_createErpRowOpeningIntervention;
}

export interface CreateErpRowOpeningInterventionMutationVariables {
  creation: ErpRowOpeningInterventionCreation;
}
