/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SpreadsheetCellType } from "./globalTypes";

// ====================================================
// GraphQL fragment: SpreadsheetCellFragment
// ====================================================

export interface SpreadsheetCellFragment {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}
