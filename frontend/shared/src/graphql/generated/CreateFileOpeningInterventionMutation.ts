/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileOpeningInterventionCreation, InterventionType, Relevance, EmailDirectory, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateFileOpeningInterventionMutation
// ====================================================

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_FileOpeningIntervention_interventionEmail {
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

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_FileOpeningIntervention_file {
  __typename: "File";
  name: string;
}

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_FileOpeningIntervention {
  __typename: "FileOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateFileOpeningInterventionMutation_createFileOpeningIntervention_FileOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  fileId: string;
  file: CreateFileOpeningInterventionMutation_createFileOpeningIntervention_FileOpeningIntervention_file;
}

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_EmailOpeningIntervention_interventionEmail {
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

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_EmailOpeningIntervention_email {
  __typename: "Email";
  sender: string | null;
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
}

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_EmailOpeningIntervention {
  __typename: "EmailOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateFileOpeningInterventionMutation_createFileOpeningIntervention_EmailOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  emailId: string;
  email: CreateFileOpeningInterventionMutation_createFileOpeningIntervention_EmailOpeningIntervention_email;
}

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_NotesContentIntervention_interventionEmail {
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

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_NotesContentIntervention {
  __typename: "NotesContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateFileOpeningInterventionMutation_createFileOpeningIntervention_NotesContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
}

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_SpreadsheetCellContentIntervention_interventionEmail {
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

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_SpreadsheetCellContentIntervention_file {
  __typename: "File";
  name: string;
}

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_SpreadsheetCellContentIntervention {
  __typename: "SpreadsheetCellContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateFileOpeningInterventionMutation_createFileOpeningIntervention_SpreadsheetCellContentIntervention_interventionEmail;
  isNegated: boolean;
  value: string;
  spreadsheetRowIndex: number;
  spreadsheetId: string;
  spreadsheetColumnIndex: number;
  timeOffsetInSeconds: number;
  fileId: string;
  file: CreateFileOpeningInterventionMutation_createFileOpeningIntervention_SpreadsheetCellContentIntervention_file;
}

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail {
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

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_answer {
  __typename: "QuestionnaireAnswer";
  id: string;
  text: string;
  questionId: string;
  position: number;
  isCorrect: boolean;
}

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention {
  __typename: "RuntimeSurveyAnswerSelectionIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateFileOpeningInterventionMutation_createFileOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail;
  answerId: string;
  isNegated: boolean;
  answer: CreateFileOpeningInterventionMutation_createFileOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_answer;
}

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_ErpRowOpeningIntervention_interventionEmail {
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

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_ErpRowOpeningIntervention {
  __typename: "ErpRowOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateFileOpeningInterventionMutation_createFileOpeningIntervention_ErpRowOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_TextDocumentContentIntervention_interventionEmail {
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

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_TextDocumentContentIntervention_file {
  __typename: "File";
  name: string;
  id: string;
}

export interface CreateFileOpeningInterventionMutation_createFileOpeningIntervention_TextDocumentContentIntervention {
  __typename: "TextDocumentContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateFileOpeningInterventionMutation_createFileOpeningIntervention_TextDocumentContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
  textDocumentId: string;
  file: CreateFileOpeningInterventionMutation_createFileOpeningIntervention_TextDocumentContentIntervention_file;
}

export type CreateFileOpeningInterventionMutation_createFileOpeningIntervention = CreateFileOpeningInterventionMutation_createFileOpeningIntervention_FileOpeningIntervention | CreateFileOpeningInterventionMutation_createFileOpeningIntervention_EmailOpeningIntervention | CreateFileOpeningInterventionMutation_createFileOpeningIntervention_NotesContentIntervention | CreateFileOpeningInterventionMutation_createFileOpeningIntervention_SpreadsheetCellContentIntervention | CreateFileOpeningInterventionMutation_createFileOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention | CreateFileOpeningInterventionMutation_createFileOpeningIntervention_ErpRowOpeningIntervention | CreateFileOpeningInterventionMutation_createFileOpeningIntervention_TextDocumentContentIntervention;

export interface CreateFileOpeningInterventionMutation {
  createFileOpeningIntervention: CreateFileOpeningInterventionMutation_createFileOpeningIntervention;
}

export interface CreateFileOpeningInterventionMutationVariables {
  creation: FileOpeningInterventionCreation;
}
