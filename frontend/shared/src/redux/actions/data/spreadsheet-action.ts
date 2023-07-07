import {Action} from "redux"
import {
  SpreadsheetStyleChange,
  SpreadsheetStyleChangeWithId
} from "../../../components/spreadsheet/dhx-spreadsheet/dhx-spreadsheet"
import {DhxCellStyle} from "../../../components/spreadsheet/dhx-spreadsheet/dhx-types"
import {SpreadsheetCellType} from "../../../graphql/generated/globalTypes"
import {LocalSpreadsheet, SpreadsheetCell} from "../../../models"

export type SpreadsheetAction =
  | InitializeSpreadsheetAction
  | SpreadsheetValueCreateAction
  | SpreadsheetValueChangeAction
  | SpreadsheetTypeChangeAction
  | SpreadsheetCellStyleChangeAction
  | SpreadsheetCellStyleChangeBatchedAction
  | SpreadsheetCreateCellBatchedAction

export enum SpreadsheetActionType {
  InitializeSpreadsheet = "InitializeSpreadsheet",
  SpreadsheetValueCreate = "SpreadsheetValueCreate",
  SpreadsheetValueChange = "SpreadsheetValueChange",
  SpreadsheetCellStyleChange = "SpreadsheetCellStyleChange",
  SpreadsheetTypeChange = "SpreadsheetTypeChange",
  SpreadsheetCellStyleChangeBatched = "SpreadsheetCellStyleChangeBatched",
  SpreadsheetCreateCellBatched = "SpreadsheetCreateCellBatched"
}

export interface InitializeSpreadsheetAction extends Action {
  readonly type: SpreadsheetActionType.InitializeSpreadsheet
  readonly payload: {
    readonly spreadsheetId: UUID
    readonly spreadsheet: LocalSpreadsheet
  }
}

export const initializeSpreadsheetAction = (
  spreadsheetId: UUID,
  spreadsheet: LocalSpreadsheet
): InitializeSpreadsheetAction => ({
  type: SpreadsheetActionType.InitializeSpreadsheet,
  payload: {spreadsheet, spreadsheetId}
})

export interface SpreadsheetValueCreateAction extends Action {
  readonly type: SpreadsheetActionType.SpreadsheetValueCreate
  readonly payload: {
    readonly spreadsheetId: UUID
    readonly creation: SpreadsheetCell
  }
}

export const spreadsheetValueCreateAction = (
  spreadsheetId: UUID,
  creation: SpreadsheetCell
): SpreadsheetValueCreateAction => ({
  type: SpreadsheetActionType.SpreadsheetValueCreate,
  payload: {creation, spreadsheetId}
})

export interface SpreadsheetValueChangeAction extends Action {
  readonly type: SpreadsheetActionType.SpreadsheetValueChange
  readonly payload: {
    readonly spreadsheetId: UUID
    readonly cellId: UUID
    readonly value: string
  }
}

export const spreadsheetValueChangeAction = (
  spreadsheetId: UUID,
  cellId: UUID,
  value: string
): SpreadsheetValueChangeAction => ({
  type: SpreadsheetActionType.SpreadsheetValueChange,
  payload: {cellId, value, spreadsheetId}
})
export interface SpreadsheetCellStyleChangeAction extends Action {
  readonly type: SpreadsheetActionType.SpreadsheetCellStyleChange
  readonly payload: {
    readonly spreadsheetId: UUID
    readonly cellId: UUID
    readonly style: DhxCellStyle
  }
}

export const spreadsheetCellStyleChangeAction = (
  spreadsheetId: UUID,
  cellId: UUID,
  style: DhxCellStyle
): SpreadsheetCellStyleChangeAction => ({
  type: SpreadsheetActionType.SpreadsheetCellStyleChange,
  payload: {cellId, style, spreadsheetId}
})

export interface SpreadsheetTypeChangeAction extends Action {
  readonly type: SpreadsheetActionType.SpreadsheetTypeChange
  readonly payload: {
    readonly spreadsheetId: UUID
    readonly cellId: UUID
    readonly type: SpreadsheetCellType
  }
}

export const spreadsheetTypeChangeAction = (
  spreadsheetId: UUID,
  cellId: UUID,
  type: SpreadsheetCellType
): SpreadsheetTypeChangeAction => ({
  type: SpreadsheetActionType.SpreadsheetTypeChange,
  payload: {cellId, type, spreadsheetId}
})

export interface SpreadsheetCellStyleChangeBatchedAction extends Action {
  readonly type: SpreadsheetActionType.SpreadsheetCellStyleChangeBatched
  readonly payload: {
    readonly spreadsheetId: UUID
    readonly changes: Array<SpreadsheetStyleChangeWithId>
  }
}

export const spreadsheetCellStyleChangeBatchedAction = (
  spreadsheetId: UUID,
  changes: Array<SpreadsheetStyleChangeWithId>
): SpreadsheetCellStyleChangeBatchedAction => ({
  type: SpreadsheetActionType.SpreadsheetCellStyleChangeBatched,
  payload: {
    spreadsheetId,
    changes
  }
})

export interface SpreadsheetCreateCellBatchedAction extends Action {
  readonly type: SpreadsheetActionType.SpreadsheetCreateCellBatched
  readonly payload: {
    spreadsheetId: UUID
    cells: Array<SpreadsheetCell>
  }
}

export const spreadsheetCreateCellBatchedAction = (
  spreadsheetId: UUID,
  cells: Array<SpreadsheetCell>
): SpreadsheetCreateCellBatchedAction => ({
  type: SpreadsheetActionType.SpreadsheetCreateCellBatched,
  payload: {
    spreadsheetId,
    cells
  }
})
