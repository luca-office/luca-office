import {Reducer} from "redux"
import {BinaryViewerTool} from "../../../enums"
import {SharedAppAction} from "../../actions/app-action"
import {SpreadsheetViewerActionType} from "../../actions/ui/spreadsheet-viewer-action"
import {WindowManagerActionType} from "../../actions/ui/window-manager-action"
import {initialSpreadsheetViewerState, SpreadsheetViewerState} from "../../state/ui/spreadsheet-viewer-state"

export const spreadsheetViewerReducer: Reducer<SpreadsheetViewerState, SharedAppAction> = (
  state = initialSpreadsheetViewerState,
  action
): SpreadsheetViewerState => {
  switch (action.type) {
    case SpreadsheetViewerActionType.OpenSpreadsheet:
      return {
        ...state,
        openSpreadsheets: [
          ...state.openSpreadsheets.filter(spreadsheet => spreadsheet.id !== action.payload.spreadsheetId),
          {id: action.payload.spreadsheetId, title: action.payload.title}
        ],
        selectedSpreadsheetId: action.payload.spreadsheetId
      }

    case SpreadsheetViewerActionType.SelectSpreadsheet:
      return {
        ...state,
        selectedSpreadsheetId: state.openSpreadsheets.some(
          spreadsheet => spreadsheet.id === action.payload.spreadsheetId
        )
          ? action.payload.spreadsheetId
          : state.selectedSpreadsheetId
      }

    case SpreadsheetViewerActionType.CloseSpreadsheet: {
      const openSpreadsheets = state.openSpreadsheets.filter(
        spreadsheet => spreadsheet.id !== action.payload.spreadsheetId
      )
      return {
        ...state,
        openSpreadsheets,
        selectedSpreadsheetId:
          state.selectedSpreadsheetId !== action.payload.spreadsheetId
            ? state.selectedSpreadsheetId
            : openSpreadsheets.length
            ? openSpreadsheets[openSpreadsheets.length - 1].id
            : null
      }
    }

    case WindowManagerActionType.CloseAllWindows:
      return initialSpreadsheetViewerState

    case WindowManagerActionType.CloseWindow:
      return action.payload.targetWindow === BinaryViewerTool.SpreadsheetEditor ? initialSpreadsheetViewerState : state

    default:
      return state
  }
}
