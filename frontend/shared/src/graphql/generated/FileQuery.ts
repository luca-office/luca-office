/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileUsageType, Relevance, MimeType, SpreadsheetCellType } from "./globalTypes";

// ====================================================
// GraphQL query operation: FileQuery
// ====================================================

export interface FileQuery_file_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface FileQuery_file_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface FileQuery_file_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: FileQuery_file_spreadsheet_cells[];
}

export interface FileQuery_file_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface FileQuery_file {
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
  binaryFile: FileQuery_file_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: FileQuery_file_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: FileQuery_file_textDocument | null;
}

export interface FileQuery {
  file: FileQuery_file | null;
}

export interface FileQueryVariables {
  id: string;
}
