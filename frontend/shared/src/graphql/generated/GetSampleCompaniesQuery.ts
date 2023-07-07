/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation, FileUsageType, Relevance, MimeType, SpreadsheetCellType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetSampleCompaniesQuery
// ====================================================

export interface GetSampleCompaniesQuery_sampleCompanies_author {
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

export interface GetSampleCompaniesQuery_sampleCompanies_logoFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface GetSampleCompaniesQuery_sampleCompanies_logoFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface GetSampleCompaniesQuery_sampleCompanies_logoFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: GetSampleCompaniesQuery_sampleCompanies_logoFile_spreadsheet_cells[];
}

export interface GetSampleCompaniesQuery_sampleCompanies_logoFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface GetSampleCompaniesQuery_sampleCompanies_logoFile {
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
  binaryFile: GetSampleCompaniesQuery_sampleCompanies_logoFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: GetSampleCompaniesQuery_sampleCompanies_logoFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: GetSampleCompaniesQuery_sampleCompanies_logoFile_textDocument | null;
}

export interface GetSampleCompaniesQuery_sampleCompanies_profileFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface GetSampleCompaniesQuery_sampleCompanies_profileFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface GetSampleCompaniesQuery_sampleCompanies_profileFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: GetSampleCompaniesQuery_sampleCompanies_profileFile_spreadsheet_cells[];
}

export interface GetSampleCompaniesQuery_sampleCompanies_profileFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface GetSampleCompaniesQuery_sampleCompanies_profileFile {
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
  binaryFile: GetSampleCompaniesQuery_sampleCompanies_profileFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: GetSampleCompaniesQuery_sampleCompanies_profileFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: GetSampleCompaniesQuery_sampleCompanies_profileFile_textDocument | null;
}

export interface GetSampleCompaniesQuery_sampleCompanies {
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
  author: GetSampleCompaniesQuery_sampleCompanies_author;
  directoryId: string;
  filesCount: number;
  erpRowsCount: number;
  logoFile: GetSampleCompaniesQuery_sampleCompanies_logoFile | null;
  profileFile: GetSampleCompaniesQuery_sampleCompanies_profileFile | null;
}

export interface GetSampleCompaniesQuery {
  sampleCompanies: GetSampleCompaniesQuery_sampleCompanies[];
}
