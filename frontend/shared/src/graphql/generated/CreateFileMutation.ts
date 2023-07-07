/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileCreation, FileUsageType, Relevance, MimeType, SpreadsheetCellType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateFileMutation
// ====================================================

export interface CreateFileMutation_createFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateFileMutation_createFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface CreateFileMutation_createFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: CreateFileMutation_createFile_spreadsheet_cells[];
}

export interface CreateFileMutation_createFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface CreateFileMutation_createFile {
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
  binaryFile: CreateFileMutation_createFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: CreateFileMutation_createFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: CreateFileMutation_createFile_textDocument | null;
}

export interface CreateFileMutation {
  createFile: CreateFileMutation_createFile;
}

export interface CreateFileMutationVariables {
  creation: FileCreation;
}
