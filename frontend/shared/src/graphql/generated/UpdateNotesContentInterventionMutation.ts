/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NotesContentInterventionUpdate, InterventionType, Relevance, EmailDirectory, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateNotesContentInterventionMutation
// ====================================================

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_FileOpeningIntervention_interventionEmail {
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

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_FileOpeningIntervention_file {
  __typename: "File";
  name: string;
}

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_FileOpeningIntervention {
  __typename: "FileOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateNotesContentInterventionMutation_updateNotesContentIntervention_FileOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  fileId: string;
  file: UpdateNotesContentInterventionMutation_updateNotesContentIntervention_FileOpeningIntervention_file;
}

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_EmailOpeningIntervention_interventionEmail {
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

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_EmailOpeningIntervention_email {
  __typename: "Email";
  sender: string | null;
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
}

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_EmailOpeningIntervention {
  __typename: "EmailOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateNotesContentInterventionMutation_updateNotesContentIntervention_EmailOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  emailId: string;
  email: UpdateNotesContentInterventionMutation_updateNotesContentIntervention_EmailOpeningIntervention_email;
}

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_NotesContentIntervention_interventionEmail {
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

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_NotesContentIntervention {
  __typename: "NotesContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateNotesContentInterventionMutation_updateNotesContentIntervention_NotesContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
}

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_SpreadsheetCellContentIntervention_interventionEmail {
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

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_SpreadsheetCellContentIntervention_file {
  __typename: "File";
  name: string;
}

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_SpreadsheetCellContentIntervention {
  __typename: "SpreadsheetCellContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateNotesContentInterventionMutation_updateNotesContentIntervention_SpreadsheetCellContentIntervention_interventionEmail;
  isNegated: boolean;
  value: string;
  spreadsheetRowIndex: number;
  spreadsheetId: string;
  spreadsheetColumnIndex: number;
  timeOffsetInSeconds: number;
  fileId: string;
  file: UpdateNotesContentInterventionMutation_updateNotesContentIntervention_SpreadsheetCellContentIntervention_file;
}

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail {
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

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_RuntimeSurveyAnswerSelectionIntervention_answer {
  __typename: "QuestionnaireAnswer";
  id: string;
  text: string;
  questionId: string;
  position: number;
  isCorrect: boolean;
}

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_RuntimeSurveyAnswerSelectionIntervention {
  __typename: "RuntimeSurveyAnswerSelectionIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateNotesContentInterventionMutation_updateNotesContentIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail;
  answerId: string;
  isNegated: boolean;
  answer: UpdateNotesContentInterventionMutation_updateNotesContentIntervention_RuntimeSurveyAnswerSelectionIntervention_answer;
}

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_ErpRowOpeningIntervention_interventionEmail {
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

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_ErpRowOpeningIntervention {
  __typename: "ErpRowOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateNotesContentInterventionMutation_updateNotesContentIntervention_ErpRowOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_TextDocumentContentIntervention_interventionEmail {
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

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_TextDocumentContentIntervention_file {
  __typename: "File";
  name: string;
  id: string;
}

export interface UpdateNotesContentInterventionMutation_updateNotesContentIntervention_TextDocumentContentIntervention {
  __typename: "TextDocumentContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateNotesContentInterventionMutation_updateNotesContentIntervention_TextDocumentContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
  textDocumentId: string;
  file: UpdateNotesContentInterventionMutation_updateNotesContentIntervention_TextDocumentContentIntervention_file;
}

export type UpdateNotesContentInterventionMutation_updateNotesContentIntervention = UpdateNotesContentInterventionMutation_updateNotesContentIntervention_FileOpeningIntervention | UpdateNotesContentInterventionMutation_updateNotesContentIntervention_EmailOpeningIntervention | UpdateNotesContentInterventionMutation_updateNotesContentIntervention_NotesContentIntervention | UpdateNotesContentInterventionMutation_updateNotesContentIntervention_SpreadsheetCellContentIntervention | UpdateNotesContentInterventionMutation_updateNotesContentIntervention_RuntimeSurveyAnswerSelectionIntervention | UpdateNotesContentInterventionMutation_updateNotesContentIntervention_ErpRowOpeningIntervention | UpdateNotesContentInterventionMutation_updateNotesContentIntervention_TextDocumentContentIntervention;

export interface UpdateNotesContentInterventionMutation {
  updateNotesContentIntervention: UpdateNotesContentInterventionMutation_updateNotesContentIntervention;
}

export interface UpdateNotesContentInterventionMutationVariables {
  id: string;
  update: NotesContentInterventionUpdate;
}
