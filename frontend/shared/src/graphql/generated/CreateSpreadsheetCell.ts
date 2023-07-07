/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SpreadsheetCellCreation, SpreadsheetCellType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSpreadsheetCell
// ====================================================

export interface CreateSpreadsheetCell_createSpreadsheetCell {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface CreateSpreadsheetCell {
  createSpreadsheetCell: CreateSpreadsheetCell_createSpreadsheetCell;
}

export interface CreateSpreadsheetCellVariables {
  creation: SpreadsheetCellCreation;
}
