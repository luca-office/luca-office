/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NotesContentInterventionCreation, InterventionType, Relevance, EmailDirectory, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateNotesContentInterventionMutation
// ====================================================

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_FileOpeningIntervention_interventionEmail {
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

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_FileOpeningIntervention_file {
  __typename: "File";
  name: string;
}

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_FileOpeningIntervention {
  __typename: "FileOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateNotesContentInterventionMutation_createNotesContentIntervention_FileOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  fileId: string;
  file: CreateNotesContentInterventionMutation_createNotesContentIntervention_FileOpeningIntervention_file;
}

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_EmailOpeningIntervention_interventionEmail {
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

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_EmailOpeningIntervention_email {
  __typename: "Email";
  sender: string | null;
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
}

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_EmailOpeningIntervention {
  __typename: "EmailOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateNotesContentInterventionMutation_createNotesContentIntervention_EmailOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  emailId: string;
  email: CreateNotesContentInterventionMutation_createNotesContentIntervention_EmailOpeningIntervention_email;
}

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_NotesContentIntervention_interventionEmail {
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

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_NotesContentIntervention {
  __typename: "NotesContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateNotesContentInterventionMutation_createNotesContentIntervention_NotesContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
}

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_SpreadsheetCellContentIntervention_interventionEmail {
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

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_SpreadsheetCellContentIntervention_file {
  __typename: "File";
  name: string;
}

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_SpreadsheetCellContentIntervention {
  __typename: "SpreadsheetCellContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateNotesContentInterventionMutation_createNotesContentIntervention_SpreadsheetCellContentIntervention_interventionEmail;
  isNegated: boolean;
  value: string;
  spreadsheetRowIndex: number;
  spreadsheetId: string;
  spreadsheetColumnIndex: number;
  timeOffsetInSeconds: number;
  fileId: string;
  file: CreateNotesContentInterventionMutation_createNotesContentIntervention_SpreadsheetCellContentIntervention_file;
}

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail {
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

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_RuntimeSurveyAnswerSelectionIntervention_answer {
  __typename: "QuestionnaireAnswer";
  id: string;
  text: string;
  questionId: string;
  position: number;
  isCorrect: boolean;
}

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_RuntimeSurveyAnswerSelectionIntervention {
  __typename: "RuntimeSurveyAnswerSelectionIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateNotesContentInterventionMutation_createNotesContentIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail;
  answerId: string;
  isNegated: boolean;
  answer: CreateNotesContentInterventionMutation_createNotesContentIntervention_RuntimeSurveyAnswerSelectionIntervention_answer;
}

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_ErpRowOpeningIntervention_interventionEmail {
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

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_ErpRowOpeningIntervention {
  __typename: "ErpRowOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateNotesContentInterventionMutation_createNotesContentIntervention_ErpRowOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_TextDocumentContentIntervention_interventionEmail {
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

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_TextDocumentContentIntervention_file {
  __typename: "File";
  name: string;
  id: string;
}

export interface CreateNotesContentInterventionMutation_createNotesContentIntervention_TextDocumentContentIntervention {
  __typename: "TextDocumentContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateNotesContentInterventionMutation_createNotesContentIntervention_TextDocumentContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
  textDocumentId: string;
  file: CreateNotesContentInterventionMutation_createNotesContentIntervention_TextDocumentContentIntervention_file;
}

export type CreateNotesContentInterventionMutation_createNotesContentIntervention = CreateNotesContentInterventionMutation_createNotesContentIntervention_FileOpeningIntervention | CreateNotesContentInterventionMutation_createNotesContentIntervention_EmailOpeningIntervention | CreateNotesContentInterventionMutation_createNotesContentIntervention_NotesContentIntervention | CreateNotesContentInterventionMutation_createNotesContentIntervention_SpreadsheetCellContentIntervention | CreateNotesContentInterventionMutation_createNotesContentIntervention_RuntimeSurveyAnswerSelectionIntervention | CreateNotesContentInterventionMutation_createNotesContentIntervention_ErpRowOpeningIntervention | CreateNotesContentInterventionMutation_createNotesContentIntervention_TextDocumentContentIntervention;

export interface CreateNotesContentInterventionMutation {
  createNotesContentIntervention: CreateNotesContentInterventionMutation_createNotesContentIntervention;
}

export interface CreateNotesContentInterventionMutationVariables {
  creation: NotesContentInterventionCreation;
}
