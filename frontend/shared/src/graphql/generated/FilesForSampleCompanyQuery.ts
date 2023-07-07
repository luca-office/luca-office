/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileUsageType, Relevance, MimeType, SpreadsheetCellType } from "./globalTypes";

// ====================================================
// GraphQL query operation: FilesForSampleCompanyQuery
// ====================================================

export interface FilesForSampleCompanyQuery_filesForSampleCompany_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface FilesForSampleCompanyQuery_filesForSampleCompany_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface FilesForSampleCompanyQuery_filesForSampleCompany_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: FilesForSampleCompanyQuery_filesForSampleCompany_spreadsheet_cells[];
}

export interface FilesForSampleCompanyQuery_filesForSampleCompany_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface FilesForSampleCompanyQuery_filesForSampleCompany {
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
  binaryFile: FilesForSampleCompanyQuery_filesForSampleCompany_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: FilesForSampleCompanyQuery_filesForSampleCompany_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: FilesForSampleCompanyQuery_filesForSampleCompany_textDocument | null;
}

export interface FilesForSampleCompanyQuery {
  filesForSampleCompany: FilesForSampleCompanyQuery_filesForSampleCompany[];
}

export interface FilesForSampleCompanyQueryVariables {
  sampleCompanyId: string;
}
