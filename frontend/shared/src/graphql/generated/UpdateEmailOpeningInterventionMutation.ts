/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EmailOpeningInterventionUpdate, InterventionType, Relevance, EmailDirectory, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateEmailOpeningInterventionMutation
// ====================================================

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_FileOpeningIntervention_interventionEmail {
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

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_FileOpeningIntervention_file {
  __typename: "File";
  name: string;
}

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_FileOpeningIntervention {
  __typename: "FileOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_FileOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  fileId: string;
  file: UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_FileOpeningIntervention_file;
}

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_EmailOpeningIntervention_interventionEmail {
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

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_EmailOpeningIntervention_email {
  __typename: "Email";
  sender: string | null;
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
}

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_EmailOpeningIntervention {
  __typename: "EmailOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_EmailOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  emailId: string;
  email: UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_EmailOpeningIntervention_email;
}

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_NotesContentIntervention_interventionEmail {
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

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_NotesContentIntervention {
  __typename: "NotesContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_NotesContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
}

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_SpreadsheetCellContentIntervention_interventionEmail {
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

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_SpreadsheetCellContentIntervention_file {
  __typename: "File";
  name: string;
}

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_SpreadsheetCellContentIntervention {
  __typename: "SpreadsheetCellContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_SpreadsheetCellContentIntervention_interventionEmail;
  isNegated: boolean;
  value: string;
  spreadsheetRowIndex: number;
  spreadsheetId: string;
  spreadsheetColumnIndex: number;
  timeOffsetInSeconds: number;
  fileId: string;
  file: UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_SpreadsheetCellContentIntervention_file;
}

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail {
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

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_answer {
  __typename: "QuestionnaireAnswer";
  id: string;
  text: string;
  questionId: string;
  position: number;
  isCorrect: boolean;
}

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention {
  __typename: "RuntimeSurveyAnswerSelectionIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail;
  answerId: string;
  isNegated: boolean;
  answer: UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention_answer;
}

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_ErpRowOpeningIntervention_interventionEmail {
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

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_ErpRowOpeningIntervention {
  __typename: "ErpRowOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_ErpRowOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_TextDocumentContentIntervention_interventionEmail {
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

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_TextDocumentContentIntervention_file {
  __typename: "File";
  name: string;
  id: string;
}

export interface UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_TextDocumentContentIntervention {
  __typename: "TextDocumentContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_TextDocumentContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
  textDocumentId: string;
  file: UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_TextDocumentContentIntervention_file;
}

export type UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention = UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_FileOpeningIntervention | UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_EmailOpeningIntervention | UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_NotesContentIntervention | UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_SpreadsheetCellContentIntervention | UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_RuntimeSurveyAnswerSelectionIntervention | UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_ErpRowOpeningIntervention | UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention_TextDocumentContentIntervention;

export interface UpdateEmailOpeningInterventionMutation {
  updateEmailOpeningIntervention: UpdateEmailOpeningInterventionMutation_updateEmailOpeningIntervention;
}

export interface UpdateEmailOpeningInterventionMutationVariables {
  id: string;
  update: EmailOpeningInterventionUpdate;
}
