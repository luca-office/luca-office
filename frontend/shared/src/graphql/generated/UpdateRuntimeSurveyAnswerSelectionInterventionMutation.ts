/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RuntimeSurveyAnswerSelectionInterventionUpdate, InterventionType, Relevance, EmailDirectory, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateRuntimeSurveyAnswerSelectionInterventionMutation
// ====================================================

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_FileOpeningIntervention_interventionEmail {
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

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_FileOpeningIntervention_file {
  __typename: "File";
  name: string;
}

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_FileOpeningIntervention {
  __typename: "FileOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_FileOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  fileId: string;
  file: UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_FileOpeningIntervention_file;
}

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_EmailOpeningIntervention_interventionEmail {
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

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_EmailOpeningIntervention_email {
  __typename: "Email";
  sender: string | null;
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
}

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_EmailOpeningIntervention {
  __typename: "EmailOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_EmailOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  emailId: string;
  email: UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_EmailOpeningIntervention_email;
}

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_NotesContentIntervention_interventionEmail {
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

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_NotesContentIntervention {
  __typename: "NotesContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_NotesContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
}

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_SpreadsheetCellContentIntervention_interventionEmail {
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

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_SpreadsheetCellContentIntervention_file {
  __typename: "File";
  name: string;
}

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_SpreadsheetCellContentIntervention {
  __typename: "SpreadsheetCellContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_SpreadsheetCellContentIntervention_interventionEmail;
  isNegated: boolean;
  value: string;
  spreadsheetRowIndex: number;
  spreadsheetId: string;
  spreadsheetColumnIndex: number;
  timeOffsetInSeconds: number;
  fileId: string;
  file: UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_SpreadsheetCellContentIntervention_file;
}

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail {
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

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_RuntimeSurveyAnswerSelectionIntervention_answer {
  __typename: "QuestionnaireAnswer";
  id: string;
  text: string;
  questionId: string;
  position: number;
  isCorrect: boolean;
}

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_RuntimeSurveyAnswerSelectionIntervention {
  __typename: "RuntimeSurveyAnswerSelectionIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_RuntimeSurveyAnswerSelectionIntervention_interventionEmail;
  answerId: string;
  isNegated: boolean;
  answer: UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_RuntimeSurveyAnswerSelectionIntervention_answer;
}

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_ErpRowOpeningIntervention_interventionEmail {
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

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_ErpRowOpeningIntervention {
  __typename: "ErpRowOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_ErpRowOpeningIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_TextDocumentContentIntervention_interventionEmail {
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

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_TextDocumentContentIntervention_file {
  __typename: "File";
  name: string;
  id: string;
}

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_TextDocumentContentIntervention {
  __typename: "TextDocumentContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmailId: string;
  interventionEmail: UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_TextDocumentContentIntervention_interventionEmail;
  timeOffsetInSeconds: number;
  value: string;
  textDocumentId: string;
  file: UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_TextDocumentContentIntervention_file;
}

export type UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention = UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_FileOpeningIntervention | UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_EmailOpeningIntervention | UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_NotesContentIntervention | UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_SpreadsheetCellContentIntervention | UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_RuntimeSurveyAnswerSelectionIntervention | UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_ErpRowOpeningIntervention | UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention_TextDocumentContentIntervention;

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutation {
  updateRuntimeSurveyAnswerSelectionIntervention: UpdateRuntimeSurveyAnswerSelectionInterventionMutation_updateRuntimeSurveyAnswerSelectionIntervention;
}

export interface UpdateRuntimeSurveyAnswerSelectionInterventionMutationVariables {
  id: string;
  update: RuntimeSurveyAnswerSelectionInterventionUpdate;
}
