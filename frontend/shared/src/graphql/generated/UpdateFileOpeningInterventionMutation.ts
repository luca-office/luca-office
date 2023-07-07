/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileOpeningInterventionUpdate, InterventionType, Relevance, EmailDirectory, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateFileOpeningInterventionMutation
// ====================================================

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_FileOpeningIntervention_interventionEmail {
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

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_FileOpeningIntervention_file {
  __typename: "File";
  name: string;
}

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_FileOpeningIntervention {
  __typename: "FileOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_FileOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  fileId: string;
  file: UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_FileOpeningIntervention_file;
}

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_EmailOpeningIntervention_interventionEmail {
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

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_EmailOpeningIntervention_email {
  __typename: "Email";
  sender: string | null;
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
}

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_EmailOpeningIntervention {
  __typename: "EmailOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_EmailOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  emailId: string;
  email: UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_EmailOpeningIntervention_email;
}

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_NotesContentIntervention_interventionEmail {
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

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_NotesContentIntervention {
  __typename: "NotesContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_NotesContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
}

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_SpreadsheetCellContentIntervention_interventionEmail {
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

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_SpreadsheetCellContentIntervention_file {
  __typename: "File";
  name: string;
}

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_SpreadsheetCellContentIntervention {
  __typename: "SpreadsheetCellContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_SpreadsheetCellContentIntervention_interventionEmail;
  isNegated: boolean;
  value: string;
  spreadsheetRowIndex: number;
  spreadsheetId: string;
  spreadsheetColumnIndex: number;
  timeOffsetInSeconds: number;
  fileId: string;
  file: UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_SpreadsheetCellContentIntervention_file;
}

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail {
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

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_answer {
  __typename: "QuestionnaireAnswer";
  id: string;
  text: string;
  questionId: string;
  position: number;
  isCorrect: boolean;
}

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention {
  __typename: "RuntimeSurveyAnswerSelectionIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail;
  answerId: string;
  isNegated: boolean;
  answer: UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_answer;
}

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_ErpRowOpeningIntervention_interventionEmail {
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

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_ErpRowOpeningIntervention {
  __typename: "ErpRowOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_ErpRowOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_TextDocumentContentIntervention_interventionEmail {
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

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_TextDocumentContentIntervention_file {
  __typename: "File";
  name: string;
  id: string;
}

export interface UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_TextDocumentContentIntervention {
  __typename: "TextDocumentContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_TextDocumentContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
  textDocumentId: string;
  file: UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_TextDocumentContentIntervention_file;
}

export type UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention = UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_FileOpeningIntervention | UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_EmailOpeningIntervention | UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_NotesContentIntervention | UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_SpreadsheetCellContentIntervention | UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention | UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_ErpRowOpeningIntervention | UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention_TextDocumentContentIntervention;

export interface UpdateFileOpeningInterventionMutation {
  updateFileOpeningIntervention: UpdateFileOpeningInterventionMutation_updateFileOpeningIntervention;
}

export interface UpdateFileOpeningInterventionMutationVariables {
  id: string;
  update: FileOpeningInterventionUpdate;
}
