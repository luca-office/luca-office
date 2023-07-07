/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileUsageType, Relevance, MimeType, SpreadsheetCellType } from "./globalTypes";

// ====================================================
// GraphQL query operation: FilesForScenarioQuery
// ====================================================

export interface FilesForScenarioQuery_filesForScenario_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface FilesForScenarioQuery_filesForScenario_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface FilesForScenarioQuery_filesForScenario_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: FilesForScenarioQuery_filesForScenario_spreadsheet_cells[];
}

export interface FilesForScenarioQuery_filesForScenario_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface FilesForScenarioQuery_filesForScenario {
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
  binaryFile: FilesForScenarioQuery_filesForScenario_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: FilesForScenarioQuery_filesForScenario_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: FilesForScenarioQuery_filesForScenario_textDocument | null;
}

export interface FilesForScenarioQuery {
  filesForScenario: FilesForScenarioQuery_filesForScenario[];
}

export interface FilesForScenarioQueryVariables {
  scenarioId: string;
}
