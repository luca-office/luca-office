/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpRowOpeningInterventionUpdate, InterventionType, Relevance, EmailDirectory, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateErpRowOpeningInterventionMutation
// ====================================================

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_FileOpeningIntervention_interventionEmail {
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

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_FileOpeningIntervention_file {
  __typename: "File";
  name: string;
}

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_FileOpeningIntervention {
  __typename: "FileOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_FileOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  fileId: string;
  file: UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_FileOpeningIntervention_file;
}

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_EmailOpeningIntervention_interventionEmail {
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

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_EmailOpeningIntervention_email {
  __typename: "Email";
  sender: string | null;
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
}

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_EmailOpeningIntervention {
  __typename: "EmailOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_EmailOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  emailId: string;
  email: UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_EmailOpeningIntervention_email;
}

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_NotesContentIntervention_interventionEmail {
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

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_NotesContentIntervention {
  __typename: "NotesContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_NotesContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
}

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_SpreadsheetCellContentIntervention_interventionEmail {
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

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_SpreadsheetCellContentIntervention_file {
  __typename: "File";
  name: string;
}

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_SpreadsheetCellContentIntervention {
  __typename: "SpreadsheetCellContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_SpreadsheetCellContentIntervention_interventionEmail;
  isNegated: boolean;
  value: string;
  spreadsheetRowIndex: number;
  spreadsheetId: string;
  spreadsheetColumnIndex: number;
  timeOffsetInSeconds: number;
  fileId: string;
  file: UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_SpreadsheetCellContentIntervention_file;
}

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail {
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

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_answer {
  __typename: "QuestionnaireAnswer";
  id: string;
  text: string;
  questionId: string;
  position: number;
  isCorrect: boolean;
}

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention {
  __typename: "RuntimeSurveyAnswerSelectionIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail;
  answerId: string;
  isNegated: boolean;
  answer: UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_answer;
}

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_ErpRowOpeningIntervention_interventionEmail {
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

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_ErpRowOpeningIntervention {
  __typename: "ErpRowOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_ErpRowOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_TextDocumentContentIntervention_interventionEmail {
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

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_TextDocumentContentIntervention_file {
  __typename: "File";
  name: string;
  id: string;
}

export interface UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_TextDocumentContentIntervention {
  __typename: "TextDocumentContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_TextDocumentContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
  textDocumentId: string;
  file: UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_TextDocumentContentIntervention_file;
}

export type UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention = UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_FileOpeningIntervention | UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_EmailOpeningIntervention | UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_NotesContentIntervention | UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_SpreadsheetCellContentIntervention | UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention | UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_ErpRowOpeningIntervention | UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention_TextDocumentContentIntervention;

export interface UpdateErpRowOpeningInterventionMutation {
  updateErpRowOpeningIntervention: UpdateErpRowOpeningInterventionMutation_updateErpRowOpeningIntervention;
}

export interface UpdateErpRowOpeningInterventionMutationVariables {
  id: string;
  update: ErpRowOpeningInterventionUpdate;
}
