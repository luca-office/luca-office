import {Action} from "redux"

export type SpreadsheetViewerAction = OpenSpreadsheetAction | CloseSpreadsheetAction | SelectSpreadsheetAction

export enum SpreadsheetViewerActionType {
  OpenSpreadsheet = "OpenSpreadsheet",
  SelectSpreadsheet = "SelectSpreadsheet",
  CloseSpreadsheet = "CloseSpreadsheet"
}

export interface OpenSpreadsheetAction extends Action {
  readonly type: SpreadsheetViewerActionType.OpenSpreadsheet
  readonly payload: {
    readonly spreadsheetId: UUID
    readonly title?: string
  }
}

export const openSpreadsheet = (spreadsheetId: UUID, title?: string): OpenSpreadsheetAction => ({
  type: SpreadsheetViewerActionType.OpenSpreadsheet,
  payload: {spreadsheetId, title}
})

export interface CloseSpreadsheetAction extends Action {
  readonly type: SpreadsheetViewerActionType.CloseSpreadsheet
  readonly payload: {
    readonly spreadsheetId: UUID
  }
}

export const closeSpreadsheet = (spreadsheetId: UUID): CloseSpreadsheetAction => ({
  type: SpreadsheetViewerActionType.CloseSpreadsheet,
  payload: {spreadsheetId}
})

export interface SelectSpreadsheetAction extends Action {
  readonly type: SpreadsheetViewerActionType.SelectSpreadsheet
  readonly payload: {
    readonly spreadsheetId: UUID
  }
}

export const selectSpreadsheet = (spreadsheetId: UUID): SelectSpreadsheetAction => ({
  type: SpreadsheetViewerActionType.SelectSpreadsheet,
  payload: {spreadsheetId}
})
