/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SpreadsheetCellType } from "./globalTypes";

// ====================================================
// GraphQL query operation: SpreadsheetQuery
// ====================================================

export interface SpreadsheetQuery_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface SpreadsheetQuery_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: SpreadsheetQuery_spreadsheet_cells[];
}

export interface SpreadsheetQuery {
  spreadsheet: SpreadsheetQuery_spreadsheet | null;
}

export interface SpreadsheetQueryVariables {
  id: string;
}
