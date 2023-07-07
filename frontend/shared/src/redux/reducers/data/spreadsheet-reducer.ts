import {Reducer} from "redux"
import {SpreadsheetCell} from "../../../models"
import {SharedAppAction} from "../../actions"
import {SpreadsheetActionType} from "../../actions/data/spreadsheet-action"
import {initialSpreadsheetState, SpreadsheetState} from "../../state/data"

export const spreadsheetReducer: Reducer<SpreadsheetState, SharedAppAction> = (
  state = initialSpreadsheetState,
  action
) => {
  switch (action.type) {
    case SpreadsheetActionType.InitializeSpreadsheet:
      return {
        ...state,
        [action.payload.spreadsheetId]: action.payload.spreadsheet
      }
    case SpreadsheetActionType.SpreadsheetValueChange:
      return {
        ...state,
        [action.payload.spreadsheetId]: {
          ...state[action.payload.spreadsheetId],
          cells: {
            ...state[action.payload.spreadsheetId]?.cells,
            [action.payload.cellId]: {
              ...state[action.payload.spreadsheetId]?.cells[action.payload.cellId],
              value: action.payload.value
            }
          }
        }
      }
    case SpreadsheetActionType.SpreadsheetCellStyleChange:
      return {
        ...state,
        [action.payload.spreadsheetId]: {
          ...state[action.payload.spreadsheetId],
          cells: {
            ...state[action.payload.spreadsheetId]?.cells,
            [action.payload.cellId]: {
              ...state[action.payload.spreadsheetId]?.cells[action.payload.cellId],
              style: JSON.stringify(action.payload.style)
            }
          }
        }
      }
    case SpreadsheetActionType.SpreadsheetCellStyleChangeBatched: {
      const {spreadsheetId, changes} = action.payload

      return {
        ...state,
        [spreadsheetId]: {
          ...state[spreadsheetId],
          cells: {
            ...state[spreadsheetId].cells,
            ...changes.reduce((changedCells, change) => {
              changedCells[change.id] = {...state[spreadsheetId].cells[change.id], style: JSON.stringify(change.style)}
              return changedCells
            }, {} as {[cellId: string]: SpreadsheetCell})
          }
        }
      }
    }

    case SpreadsheetActionType.SpreadsheetValueCreate:
      return {
        ...state,
        [action.payload.spreadsheetId]: {
          ...state[action.payload.spreadsheetId],
          cells: {
            ...state[action.payload.spreadsheetId]?.cells,
            [action.payload.creation.id]: action.payload.creation
          }
        }
      }

    case SpreadsheetActionType.SpreadsheetCreateCellBatched: {
      return {
        ...state,
        [action.payload.spreadsheetId]: {
          ...state[action.payload.spreadsheetId],
          cells: {
            ...state[action.payload.spreadsheetId]?.cells,
            ...action.payload.cells.reduce((newCells, cell) => {
              newCells[cell.id] = cell
              return newCells
            }, {} as {[cellId: string]: SpreadsheetCell})
          }
        }
      }
    }

    case SpreadsheetActionType.SpreadsheetTypeChange:
      return {
        ...state,
        [action.payload.spreadsheetId]: {
          ...state[action.payload.spreadsheetId],
          cells: {
            ...state[action.payload.spreadsheetId]?.cells,
            [action.payload.cellId]: {
              ...state[action.payload.spreadsheetId]?.cells[action.payload.cellId],
              cellType: action.payload.type
            }
          }
        }
      }

    default:
      return state
  }
}
