/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SpreadsheetCellContentInterventionUpdate, InterventionType, Relevance, EmailDirectory, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSpreadsheetCellContentInterventionMutation
// ====================================================

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_FileOpeningIntervention_interventionEmail {
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

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_FileOpeningIntervention_file {
  __typename: "File";
  name: string;
}

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_FileOpeningIntervention {
  __typename: "FileOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_FileOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  fileId: string;
  file: UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_FileOpeningIntervention_file;
}

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_EmailOpeningIntervention_interventionEmail {
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

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_EmailOpeningIntervention_email {
  __typename: "Email";
  sender: string | null;
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
}

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_EmailOpeningIntervention {
  __typename: "EmailOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_EmailOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  emailId: string;
  email: UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_EmailOpeningIntervention_email;
}

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_NotesContentIntervention_interventionEmail {
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

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_NotesContentIntervention {
  __typename: "NotesContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_NotesContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
}

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_SpreadsheetCellContentIntervention_interventionEmail {
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

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_SpreadsheetCellContentIntervention_file {
  __typename: "File";
  name: string;
}

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_SpreadsheetCellContentIntervention {
  __typename: "SpreadsheetCellContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_SpreadsheetCellContentIntervention_interventionEmail;
  isNegated: boolean;
  value: string;
  spreadsheetRowIndex: number;
  spreadsheetId: string;
  spreadsheetColumnIndex: number;
  timeOffsetInSeconds: number;
  fileId: string;
  file: UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_SpreadsheetCellContentIntervention_file;
}

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail {
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

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_RuntimeSurveyAnswerSelectionIntervention_answer {
  __typename: "QuestionnaireAnswer";
  id: string;
  text: string;
  questionId: string;
  position: number;
  isCorrect: boolean;
}

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_RuntimeSurveyAnswerSelectionIntervention {
  __typename: "RuntimeSurveyAnswerSelectionIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail;
  answerId: string;
  isNegated: boolean;
  answer: UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_RuntimeSurveyAnswerSelectionIntervention_answer;
}

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_ErpRowOpeningIntervention_interventionEmail {
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

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_ErpRowOpeningIntervention {
  __typename: "ErpRowOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_ErpRowOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_TextDocumentContentIntervention_interventionEmail {
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

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_TextDocumentContentIntervention_file {
  __typename: "File";
  name: string;
  id: string;
}

export interface UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_TextDocumentContentIntervention {
  __typename: "TextDocumentContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_TextDocumentContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
  textDocumentId: string;
  file: UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_TextDocumentContentIntervention_file;
}

export type UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention = UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_FileOpeningIntervention | UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_EmailOpeningIntervention | UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_NotesContentIntervention | UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_SpreadsheetCellContentIntervention | UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_RuntimeSurveyAnswerSelectionIntervention | UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_ErpRowOpeningIntervention | UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention_TextDocumentContentIntervention;

export interface UpdateSpreadsheetCellContentInterventionMutation {
  updateSpreadsheetCellContentIntervention: UpdateSpreadsheetCellContentInterventionMutation_updateSpreadsheetCellContentIntervention;
}

export interface UpdateSpreadsheetCellContentInterventionMutationVariables {
  id: string;
  update: SpreadsheetCellContentInterventionUpdate;
}
