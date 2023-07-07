/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TextDocumentContentInterventionCreation, InterventionType, Relevance, EmailDirectory, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTextDocumentContentInterventionMutation
// ====================================================

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_FileOpeningIntervention_interventionEmail {
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

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_FileOpeningIntervention_file {
  __typename: "File";
  name: string;
}

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_FileOpeningIntervention {
  __typename: "FileOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_FileOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  fileId: string;
  file: CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_FileOpeningIntervention_file;
}

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_EmailOpeningIntervention_interventionEmail {
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

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_EmailOpeningIntervention_email {
  __typename: "Email";
  sender: string | null;
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
}

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_EmailOpeningIntervention {
  __typename: "EmailOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_EmailOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  emailId: string;
  email: CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_EmailOpeningIntervention_email;
}

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_NotesContentIntervention_interventionEmail {
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

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_NotesContentIntervention {
  __typename: "NotesContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_NotesContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
}

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_SpreadsheetCellContentIntervention_interventionEmail {
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

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_SpreadsheetCellContentIntervention_file {
  __typename: "File";
  name: string;
}

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_SpreadsheetCellContentIntervention {
  __typename: "SpreadsheetCellContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_SpreadsheetCellContentIntervention_interventionEmail;
  isNegated: boolean;
  value: string;
  spreadsheetRowIndex: number;
  spreadsheetId: string;
  spreadsheetColumnIndex: number;
  timeOffsetInSeconds: number;
  fileId: string;
  file: CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_SpreadsheetCellContentIntervention_file;
}

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail {
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

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_RuntimeSurveyAnswerSelectionIntervention_answer {
  __typename: "QuestionnaireAnswer";
  id: string;
  text: string;
  questionId: string;
  position: number;
  isCorrect: boolean;
}

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_RuntimeSurveyAnswerSelectionIntervention {
  __typename: "RuntimeSurveyAnswerSelectionIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail;
  answerId: string;
  isNegated: boolean;
  answer: CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_RuntimeSurveyAnswerSelectionIntervention_answer;
}

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_ErpRowOpeningIntervention_interventionEmail {
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

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_ErpRowOpeningIntervention {
  __typename: "ErpRowOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_ErpRowOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_TextDocumentContentIntervention_interventionEmail {
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

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_TextDocumentContentIntervention_file {
  __typename: "File";
  name: string;
  id: string;
}

export interface CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_TextDocumentContentIntervention {
  __typename: "TextDocumentContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_TextDocumentContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
  textDocumentId: string;
  file: CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_TextDocumentContentIntervention_file;
}

export type CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention = CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_FileOpeningIntervention | CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_EmailOpeningIntervention | CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_NotesContentIntervention | CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_SpreadsheetCellContentIntervention | CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_RuntimeSurveyAnswerSelectionIntervention | CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_ErpRowOpeningIntervention | CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention_TextDocumentContentIntervention;

export interface CreateTextDocumentContentInterventionMutation {
  createTextDocumentContentIntervention: CreateTextDocumentContentInterventionMutation_createTextDocumentContentIntervention;
}

export interface CreateTextDocumentContentInterventionMutationVariables {
  creation: TextDocumentContentInterventionCreation;
}
