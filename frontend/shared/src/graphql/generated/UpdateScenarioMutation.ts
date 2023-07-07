/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioUpdate, Salutation, EmailDirectory, Relevance, FileUsageType, MimeType, SpreadsheetCellType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateScenarioMutation
// ====================================================

export interface UpdateScenarioMutation_updateScenario_author {
  __typename: "UserAccount";
  id: string;
  createdAt: string;
  modifiedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  salutation: Salutation;
  mayAdministrateUserAccounts: boolean;
  mayAdministrateRScripts: boolean;
  mayArchive: boolean;
  mayFinalizeWithoutPublishing: boolean;
}

export interface UpdateScenarioMutation_updateScenario_introductionEmail {
  __typename: "Email";
  id: string;
  createdAt: string;
  modifiedAt: string;
  sender: string | null;
  recipient: string | null;
  ccRecipients: string[];
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
  isInitiallyRead: boolean;
  relevance: Relevance;
  message: string;
  scenarioId: string;
}

export interface UpdateScenarioMutation_updateScenario_sampleCompany_author {
  __typename: "UserAccount";
  id: string;
  createdAt: string;
  modifiedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  salutation: Salutation;
  mayAdministrateUserAccounts: boolean;
  mayAdministrateRScripts: boolean;
  mayArchive: boolean;
  mayFinalizeWithoutPublishing: boolean;
}

export interface UpdateScenarioMutation_updateScenario_sampleCompany_logoFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateScenarioMutation_updateScenario_sampleCompany_logoFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface UpdateScenarioMutation_updateScenario_sampleCompany_logoFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: UpdateScenarioMutation_updateScenario_sampleCompany_logoFile_spreadsheet_cells[];
}

export interface UpdateScenarioMutation_updateScenario_sampleCompany_logoFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface UpdateScenarioMutation_updateScenario_sampleCompany_logoFile {
  __typename: "File";
  id: string;
  createdAt: string;
  modifiedAt: string;
  usageType: FileUsageType;
  name: string;
  relevance: Relevance;
  tags: string[];
  directoryId: string | null;
  emailId: string | null;
  binaryFileId: string | null;
  spreadsheetId: string | null;
  binaryFile: UpdateScenarioMutation_updateScenario_sampleCompany_logoFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: UpdateScenarioMutation_updateScenario_sampleCompany_logoFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: UpdateScenarioMutation_updateScenario_sampleCompany_logoFile_textDocument | null;
}

export interface UpdateScenarioMutation_updateScenario_sampleCompany_profileFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateScenarioMutation_updateScenario_sampleCompany_profileFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface UpdateScenarioMutation_updateScenario_sampleCompany_profileFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: UpdateScenarioMutation_updateScenario_sampleCompany_profileFile_spreadsheet_cells[];
}

export interface UpdateScenarioMutation_updateScenario_sampleCompany_profileFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface UpdateScenarioMutation_updateScenario_sampleCompany_profileFile {
  __typename: "File";
  id: string;
  createdAt: string;
  modifiedAt: string;
  usageType: FileUsageType;
  name: string;
  relevance: Relevance;
  tags: string[];
  directoryId: string | null;
  emailId: string | null;
  binaryFileId: string | null;
  spreadsheetId: string | null;
  binaryFile: UpdateScenarioMutation_updateScenario_sampleCompany_profileFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: UpdateScenarioMutation_updateScenario_sampleCompany_profileFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: UpdateScenarioMutation_updateScenario_sampleCompany_profileFile_textDocument | null;
}

export interface UpdateScenarioMutation_updateScenario_sampleCompany {
  __typename: "SampleCompany";
  id: string;
  createdAt: string;
  modifiedAt: string;
  authorId: string;
  name: string;
  description: string;
  tags: string[];
  emailSignature: string | null;
  profileFileId: string | null;
  logoFileId: string | null;
  publishedAt: string | null;
  domain: string | null;
  archivedAt: string | null;
  author: UpdateScenarioMutation_updateScenario_sampleCompany_author;
  directoryId: string;
  filesCount: number;
  erpRowsCount: number;
  logoFile: UpdateScenarioMutation_updateScenario_sampleCompany_logoFile | null;
  profileFile: UpdateScenarioMutation_updateScenario_sampleCompany_profileFile | null;
}

export interface UpdateScenarioMutation_updateScenario_codingModel_scenario_author {
  __typename: "UserAccount";
  id: string;
  createdAt: string;
  modifiedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  salutation: Salutation;
  mayAdministrateUserAccounts: boolean;
  mayAdministrateRScripts: boolean;
  mayArchive: boolean;
  mayFinalizeWithoutPublishing: boolean;
}

export interface UpdateScenarioMutation_updateScenario_codingModel_scenario_introductionEmail {
  __typename: "Email";
  id: string;
  createdAt: string;
  modifiedAt: string;
  sender: string | null;
  recipient: string | null;
  ccRecipients: string[];
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
  isInitiallyRead: boolean;
  relevance: Relevance;
  message: string;
  scenarioId: string;
}

export interface UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_author {
  __typename: "UserAccount";
  id: string;
  createdAt: string;
  modifiedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  salutation: Salutation;
  mayAdministrateUserAccounts: boolean;
  mayAdministrateRScripts: boolean;
  mayArchive: boolean;
  mayFinalizeWithoutPublishing: boolean;
}

export interface UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_logoFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_logoFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_logoFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_logoFile_spreadsheet_cells[];
}

export interface UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_logoFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_logoFile {
  __typename: "File";
  id: string;
  createdAt: string;
  modifiedAt: string;
  usageType: FileUsageType;
  name: string;
  relevance: Relevance;
  tags: string[];
  directoryId: string | null;
  emailId: string | null;
  binaryFileId: string | null;
  spreadsheetId: string | null;
  binaryFile: UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_logoFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_logoFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_logoFile_textDocument | null;
}

export interface UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_profileFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_profileFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_profileFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_profileFile_spreadsheet_cells[];
}

export interface UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_profileFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_profileFile {
  __typename: "File";
  id: string;
  createdAt: string;
  modifiedAt: string;
  usageType: FileUsageType;
  name: string;
  relevance: Relevance;
  tags: string[];
  directoryId: string | null;
  emailId: string | null;
  binaryFileId: string | null;
  spreadsheetId: string | null;
  binaryFile: UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_profileFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_profileFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_profileFile_textDocument | null;
}

export interface UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany {
  __typename: "SampleCompany";
  id: string;
  createdAt: string;
  modifiedAt: string;
  authorId: string;
  name: string;
  description: string;
  tags: string[];
  emailSignature: string | null;
  profileFileId: string | null;
  logoFileId: string | null;
  publishedAt: string | null;
  domain: string | null;
  archivedAt: string | null;
  author: UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_author;
  directoryId: string;
  filesCount: number;
  erpRowsCount: number;
  logoFile: UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_logoFile | null;
  profileFile: UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany_profileFile | null;
}

export interface UpdateScenarioMutation_updateScenario_codingModel_scenario {
  __typename: "Scenario";
  id: string;
  createdAt: string;
  modifiedAt: string;
  date: string | null;
  name: string;
  description: string;
  maxDurationInSeconds: number | null;
  introductionEmailId: string | null;
  authorId: string;
  shouldDisplayTime: boolean;
  finalizedAt: string | null;
  publishedAt: string | null;
  tags: string[];
  completionEmailAddress: string | null;
  shouldHideReferenceBookChapters: boolean;
  sampleCompanyId: string | null;
  archivedAt: string | null;
  author: UpdateScenarioMutation_updateScenario_codingModel_scenario_author;
  introductionEmail: UpdateScenarioMutation_updateScenario_codingModel_scenario_introductionEmail | null;
  sampleCompany: UpdateScenarioMutation_updateScenario_codingModel_scenario_sampleCompany | null;
}

export interface UpdateScenarioMutation_updateScenario_codingModel {
  __typename: "CodingModel";
  id: string;
  createdAt: string;
  modifiedAt: string;
  title: string;
  description: string;
  scenarioId: string;
  scenario: UpdateScenarioMutation_updateScenario_codingModel_scenario;
  dimensionsCount: number;
}

export interface UpdateScenarioMutation_updateScenario {
  __typename: "Scenario";
  id: string;
  createdAt: string;
  modifiedAt: string;
  date: string | null;
  name: string;
  description: string;
  maxDurationInSeconds: number | null;
  introductionEmailId: string | null;
  authorId: string;
  shouldDisplayTime: boolean;
  finalizedAt: string | null;
  publishedAt: string | null;
  tags: string[];
  completionEmailAddress: string | null;
  shouldHideReferenceBookChapters: boolean;
  sampleCompanyId: string | null;
  archivedAt: string | null;
  author: UpdateScenarioMutation_updateScenario_author;
  introductionEmail: UpdateScenarioMutation_updateScenario_introductionEmail | null;
  sampleCompany: UpdateScenarioMutation_updateScenario_sampleCompany | null;
  codingModel: UpdateScenarioMutation_updateScenario_codingModel | null;
}

export interface UpdateScenarioMutation {
  updateScenario: UpdateScenarioMutation_updateScenario;
}

export interface UpdateScenarioMutationVariables {
  id: string;
  update: ScenarioUpdate;
}
