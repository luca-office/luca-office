/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EmailOpeningInterventionCreation, InterventionType, Relevance, EmailDirectory, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateEmailOpeningInterventionMutation
// ====================================================

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_FileOpeningIntervention_interventionEmail {
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

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_FileOpeningIntervention_file {
  __typename: "File";
  name: string;
}

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_FileOpeningIntervention {
  __typename: "FileOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_FileOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  fileId: string;
  file: CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_FileOpeningIntervention_file;
}

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_EmailOpeningIntervention_interventionEmail {
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

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_EmailOpeningIntervention_email {
  __typename: "Email";
  sender: string | null;
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
}

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_EmailOpeningIntervention {
  __typename: "EmailOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_EmailOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  emailId: string;
  email: CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_EmailOpeningIntervention_email;
}

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_NotesContentIntervention_interventionEmail {
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

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_NotesContentIntervention {
  __typename: "NotesContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_NotesContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
}

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_SpreadsheetCellContentIntervention_interventionEmail {
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

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_SpreadsheetCellContentIntervention_file {
  __typename: "File";
  name: string;
}

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_SpreadsheetCellContentIntervention {
  __typename: "SpreadsheetCellContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_SpreadsheetCellContentIntervention_interventionEmail;
  isNegated: boolean;
  value: string;
  spreadsheetRowIndex: number;
  spreadsheetId: string;
  spreadsheetColumnIndex: number;
  timeOffsetInSeconds: number;
  fileId: string;
  file: CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_SpreadsheetCellContentIntervention_file;
}

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail {
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

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_answer {
  __typename: "QuestionnaireAnswer";
  id: string;
  text: string;
  questionId: string;
  position: number;
  isCorrect: boolean;
}

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention {
  __typename: "RuntimeSurveyAnswerSelectionIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail;
  answerId: string;
  isNegated: boolean;
  answer: CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_answer;
}

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_ErpRowOpeningIntervention_interventionEmail {
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

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_ErpRowOpeningIntervention {
  __typename: "ErpRowOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_ErpRowOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_TextDocumentContentIntervention_interventionEmail {
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

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_TextDocumentContentIntervention_file {
  __typename: "File";
  name: string;
  id: string;
}

export interface CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_TextDocumentContentIntervention {
  __typename: "TextDocumentContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_TextDocumentContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
  textDocumentId: string;
  file: CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_TextDocumentContentIntervention_file;
}

export type CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention = CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_FileOpeningIntervention | CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_EmailOpeningIntervention | CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_NotesContentIntervention | CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_SpreadsheetCellContentIntervention | CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention | CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_ErpRowOpeningIntervention | CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention_TextDocumentContentIntervention;

export interface CreateEmailOpeningInterventionMutation {
  createEmailOpeningIntervention: CreateEmailOpeningInterventionMutation_createEmailOpeningIntervention;
}

export interface CreateEmailOpeningInterventionMutationVariables {
  creation: EmailOpeningInterventionCreation;
}
