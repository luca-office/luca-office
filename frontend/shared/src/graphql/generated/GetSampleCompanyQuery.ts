/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation, FileUsageType, Relevance, MimeType, SpreadsheetCellType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetSampleCompanyQuery
// ====================================================

export interface GetSampleCompanyQuery_sampleCompany_author {
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

export interface GetSampleCompanyQuery_sampleCompany_logoFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface GetSampleCompanyQuery_sampleCompany_logoFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface GetSampleCompanyQuery_sampleCompany_logoFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: GetSampleCompanyQuery_sampleCompany_logoFile_spreadsheet_cells[];
}

export interface GetSampleCompanyQuery_sampleCompany_logoFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface GetSampleCompanyQuery_sampleCompany_logoFile {
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
  binaryFile: GetSampleCompanyQuery_sampleCompany_logoFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: GetSampleCompanyQuery_sampleCompany_logoFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: GetSampleCompanyQuery_sampleCompany_logoFile_textDocument | null;
}

export interface GetSampleCompanyQuery_sampleCompany_profileFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface GetSampleCompanyQuery_sampleCompany_profileFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface GetSampleCompanyQuery_sampleCompany_profileFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: GetSampleCompanyQuery_sampleCompany_profileFile_spreadsheet_cells[];
}

export interface GetSampleCompanyQuery_sampleCompany_profileFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface GetSampleCompanyQuery_sampleCompany_profileFile {
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
  binaryFile: GetSampleCompanyQuery_sampleCompany_profileFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: GetSampleCompanyQuery_sampleCompany_profileFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: GetSampleCompanyQuery_sampleCompany_profileFile_textDocument | null;
}

export interface GetSampleCompanyQuery_sampleCompany {
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
  author: GetSampleCompanyQuery_sampleCompany_author;
  directoryId: string;
  filesCount: number;
  erpRowsCount: number;
  logoFile: GetSampleCompanyQuery_sampleCompany_logoFile | null;
  profileFile: GetSampleCompanyQuery_sampleCompany_profileFile | null;
}

export interface GetSampleCompanyQuery {
  sampleCompany: GetSampleCompanyQuery_sampleCompany | null;
}

export interface GetSampleCompanyQueryVariables {
  id: string;
}
