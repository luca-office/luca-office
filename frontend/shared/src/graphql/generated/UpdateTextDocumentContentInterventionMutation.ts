/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TextDocumentContentInterventionUpdate, InterventionType, Relevance, EmailDirectory, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTextDocumentContentInterventionMutation
// ====================================================

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_FileOpeningIntervention_interventionEmail {
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

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_FileOpeningIntervention_file {
  __typename: "File";
  name: string;
}

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_FileOpeningIntervention {
  __typename: "FileOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_FileOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  fileId: string;
  file: UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_FileOpeningIntervention_file;
}

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_EmailOpeningIntervention_interventionEmail {
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

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_EmailOpeningIntervention_email {
  __typename: "Email";
  sender: string | null;
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
}

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_EmailOpeningIntervention {
  __typename: "EmailOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_EmailOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  emailId: string;
  email: UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_EmailOpeningIntervention_email;
}

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_NotesContentIntervention_interventionEmail {
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

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_NotesContentIntervention {
  __typename: "NotesContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_NotesContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
}

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_SpreadsheetCellContentIntervention_interventionEmail {
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

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_SpreadsheetCellContentIntervention_file {
  __typename: "File";
  name: string;
}

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_SpreadsheetCellContentIntervention {
  __typename: "SpreadsheetCellContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_SpreadsheetCellContentIntervention_interventionEmail;
  isNegated: boolean;
  value: string;
  spreadsheetRowIndex: number;
  spreadsheetId: string;
  spreadsheetColumnIndex: number;
  timeOffsetInSeconds: number;
  fileId: string;
  file: UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_SpreadsheetCellContentIntervention_file;
}

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail {
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

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_RuntimeSurveyAnswerSelectionIntervention_answer {
  __typename: "QuestionnaireAnswer";
  id: string;
  text: string;
  questionId: string;
  position: number;
  isCorrect: boolean;
}

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_RuntimeSurveyAnswerSelectionIntervention {
  __typename: "RuntimeSurveyAnswerSelectionIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail;
  answerId: string;
  isNegated: boolean;
  answer: UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_RuntimeSurveyAnswerSelectionIntervention_answer;
}

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_ErpRowOpeningIntervention_interventionEmail {
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

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_ErpRowOpeningIntervention {
  __typename: "ErpRowOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_ErpRowOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_TextDocumentContentIntervention_interventionEmail {
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

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_TextDocumentContentIntervention_file {
  __typename: "File";
  name: string;
  id: string;
}

export interface UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_TextDocumentContentIntervention {
  __typename: "TextDocumentContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_TextDocumentContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
  textDocumentId: string;
  file: UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_TextDocumentContentIntervention_file;
}

export type UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention = UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_FileOpeningIntervention | UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_EmailOpeningIntervention | UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_NotesContentIntervention | UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_SpreadsheetCellContentIntervention | UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_RuntimeSurveyAnswerSelectionIntervention | UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_ErpRowOpeningIntervention | UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention_TextDocumentContentIntervention;

export interface UpdateTextDocumentContentInterventionMutation {
  updateTextDocumentContentIntervention: UpdateTextDocumentContentInterventionMutation_updateTextDocumentContentIntervention;
}

export interface UpdateTextDocumentContentInterventionMutationVariables {
  id: string;
  update: TextDocumentContentInterventionUpdate;
}
