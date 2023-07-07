/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileUpdate, FileUsageType, Relevance, MimeType, SpreadsheetCellType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateFileMutation
// ====================================================

export interface UpdateFileMutation_updateFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateFileMutation_updateFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface UpdateFileMutation_updateFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: UpdateFileMutation_updateFile_spreadsheet_cells[];
}

export interface UpdateFileMutation_updateFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface UpdateFileMutation_updateFile {
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
  binaryFile: UpdateFileMutation_updateFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: UpdateFileMutation_updateFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: UpdateFileMutation_updateFile_textDocument | null;
}

export interface UpdateFileMutation {
  updateFile: UpdateFileMutation_updateFile;
}

export interface UpdateFileMutationVariables {
  id: string;
  update: FileUpdate;
}
