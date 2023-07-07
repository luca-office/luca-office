/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SpreadsheetCellContentInterventionCreation, InterventionType, Relevance, EmailDirectory, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSpreadsheetCellContentInterventionMutation
// ====================================================

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_FileOpeningIntervention_interventionEmail {
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

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_FileOpeningIntervention_file {
  __typename: "File";
  name: string;
}

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_FileOpeningIntervention {
  __typename: "FileOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_FileOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  fileId: string;
  file: CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_FileOpeningIntervention_file;
}

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_EmailOpeningIntervention_interventionEmail {
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

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_EmailOpeningIntervention_email {
  __typename: "Email";
  sender: string | null;
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
}

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_EmailOpeningIntervention {
  __typename: "EmailOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_EmailOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  emailId: string;
  email: CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_EmailOpeningIntervention_email;
}

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_NotesContentIntervention_interventionEmail {
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

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_NotesContentIntervention {
  __typename: "NotesContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_NotesContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
}

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_SpreadsheetCellContentIntervention_interventionEmail {
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

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_SpreadsheetCellContentIntervention_file {
  __typename: "File";
  name: string;
}

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_SpreadsheetCellContentIntervention {
  __typename: "SpreadsheetCellContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_SpreadsheetCellContentIntervention_interventionEmail;
  isNegated: boolean;
  value: string;
  spreadsheetRowIndex: number;
  spreadsheetId: string;
  spreadsheetColumnIndex: number;
  timeOffsetInSeconds: number;
  fileId: string;
  file: CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_SpreadsheetCellContentIntervention_file;
}

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail {
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

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_RuntimeSurveyAnswerSelectionIntervention_answer {
  __typename: "QuestionnaireAnswer";
  id: string;
  text: string;
  questionId: string;
  position: number;
  isCorrect: boolean;
}

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_RuntimeSurveyAnswerSelectionIntervention {
  __typename: "RuntimeSurveyAnswerSelectionIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail;
  answerId: string;
  isNegated: boolean;
  answer: CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_RuntimeSurveyAnswerSelectionIntervention_answer;
}

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_ErpRowOpeningIntervention_interventionEmail {
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

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_ErpRowOpeningIntervention {
  __typename: "ErpRowOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_ErpRowOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_TextDocumentContentIntervention_interventionEmail {
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

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_TextDocumentContentIntervention_file {
  __typename: "File";
  name: string;
  id: string;
}

export interface CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_TextDocumentContentIntervention {
  __typename: "TextDocumentContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_TextDocumentContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
  textDocumentId: string;
  file: CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_TextDocumentContentIntervention_file;
}

export type CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention = CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_FileOpeningIntervention | CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_EmailOpeningIntervention | CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_NotesContentIntervention | CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_SpreadsheetCellContentIntervention | CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_RuntimeSurveyAnswerSelectionIntervention | CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_ErpRowOpeningIntervention | CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention_TextDocumentContentIntervention;

export interface CreateSpreadsheetCellContentInterventionMutation {
  createSpreadsheetCellContentIntervention: CreateSpreadsheetCellContentInterventionMutation_createSpreadsheetCellContentIntervention;
}

export interface CreateSpreadsheetCellContentInterventionMutationVariables {
  creation: SpreadsheetCellContentInterventionCreation;
}
