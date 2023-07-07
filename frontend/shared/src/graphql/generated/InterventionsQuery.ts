/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InterventionType, Relevance, EmailDirectory, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL query operation: InterventionsQuery
// ====================================================

export interface InterventionsQuery_interventions_FileOpeningIntervention_interventionEmail {
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

export interface InterventionsQuery_interventions_FileOpeningIntervention_file {
  __typename: "File";
  name: string;
}

export interface InterventionsQuery_interventions_FileOpeningIntervention {
  __typename: "FileOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmail: InterventionsQuery_interventions_FileOpeningIntervention_interventionEmail;
  interventionEmailId: string;
  timeOffsetInSeconds: number;
  fileId: string;
  file: InterventionsQuery_interventions_FileOpeningIntervention_file;
}

export interface InterventionsQuery_interventions_EmailOpeningIntervention_interventionEmail {
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

export interface InterventionsQuery_interventions_EmailOpeningIntervention_email {
  __typename: "Email";
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
  sender: string | null;
}

export interface InterventionsQuery_interventions_EmailOpeningIntervention {
  __typename: "EmailOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmail: InterventionsQuery_interventions_EmailOpeningIntervention_interventionEmail;
  interventionEmailId: string;
  timeOffsetInSeconds: number;
  emailId: string;
  email: InterventionsQuery_interventions_EmailOpeningIntervention_email;
}

export interface InterventionsQuery_interventions_NotesContentIntervention_interventionEmail {
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

export interface InterventionsQuery_interventions_NotesContentIntervention {
  __typename: "NotesContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmail: InterventionsQuery_interventions_NotesContentIntervention_interventionEmail;
  interventionEmailId: string;
  timeOffsetInSeconds: number;
  value: string;
}

export interface InterventionsQuery_interventions_TextDocumentContentIntervention_interventionEmail {
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

export interface InterventionsQuery_interventions_TextDocumentContentIntervention_file {
  __typename: "File";
  name: string;
  id: string;
}

export interface InterventionsQuery_interventions_TextDocumentContentIntervention {
  __typename: "TextDocumentContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmail: InterventionsQuery_interventions_TextDocumentContentIntervention_interventionEmail;
  interventionEmailId: string;
  timeOffsetInSeconds: number;
  value: string;
  textDocumentId: string;
  file: InterventionsQuery_interventions_TextDocumentContentIntervention_file;
}

export interface InterventionsQuery_interventions_SpreadsheetCellContentIntervention_interventionEmail {
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

export interface InterventionsQuery_interventions_SpreadsheetCellContentIntervention_file {
  __typename: "File";
  name: string;
}

export interface InterventionsQuery_interventions_SpreadsheetCellContentIntervention {
  __typename: "SpreadsheetCellContentIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmail: InterventionsQuery_interventions_SpreadsheetCellContentIntervention_interventionEmail;
  interventionEmailId: string;
  isNegated: boolean;
  value: string;
  spreadsheetRowIndex: number;
  spreadsheetColumnIndex: number;
  timeOffsetInSeconds: number;
  spreadsheetId: string;
  fileId: string;
  file: InterventionsQuery_interventions_SpreadsheetCellContentIntervention_file;
}

export interface InterventionsQuery_interventions_RuntimeSurveyAnswerSelectionIntervention_interventionEmail {
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

export interface InterventionsQuery_interventions_RuntimeSurveyAnswerSelectionIntervention_answer {
  __typename: "QuestionnaireAnswer";
  id: string;
  text: string;
  questionId: string;
  position: number;
  isCorrect: boolean;
}

export interface InterventionsQuery_interventions_RuntimeSurveyAnswerSelectionIntervention {
  __typename: "RuntimeSurveyAnswerSelectionIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmail: InterventionsQuery_interventions_RuntimeSurveyAnswerSelectionIntervention_interventionEmail;
  interventionEmailId: string;
  answerId: string;
  isNegated: boolean;
  answer: InterventionsQuery_interventions_RuntimeSurveyAnswerSelectionIntervention_answer;
}

export interface InterventionsQuery_interventions_ErpRowOpeningIntervention_interventionEmail {
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

export interface InterventionsQuery_interventions_ErpRowOpeningIntervention {
  __typename: "ErpRowOpeningIntervention";
  id: string;
  title: string;
  interventionType: InterventionType;
  scenarioId: string;
  interventionEmail: InterventionsQuery_interventions_ErpRowOpeningIntervention_interventionEmail;
  interventionEmailId: string;
  timeOffsetInSeconds: number;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export type InterventionsQuery_interventions = InterventionsQuery_interventions_FileOpeningIntervention | InterventionsQuery_interventions_EmailOpeningIntervention | InterventionsQuery_interventions_NotesContentIntervention | InterventionsQuery_interventions_TextDocumentContentIntervention | InterventionsQuery_interventions_SpreadsheetCellContentIntervention | InterventionsQuery_interventions_RuntimeSurveyAnswerSelectionIntervention | InterventionsQuery_interventions_ErpRowOpeningIntervention;

export interface InterventionsQuery {
  interventions: InterventionsQuery_interventions[];
}

export interface InterventionsQueryVariables {
  scenarioId: string;
}
