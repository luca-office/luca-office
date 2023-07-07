/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SpreadsheetCellCreation, SpreadsheetCellType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSpreadsheet
// ====================================================

export interface UpdateSpreadsheet_updateSpreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface UpdateSpreadsheet_updateSpreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: UpdateSpreadsheet_updateSpreadsheet_cells[];
}

export interface UpdateSpreadsheet {
  updateSpreadsheet: UpdateSpreadsheet_updateSpreadsheet;
}

export interface UpdateSpreadsheetVariables {
  id: string;
  cellCreations: SpreadsheetCellCreation[];
}
