import {useDispatch} from "react-redux"
import {SpreadsheetStyleChangeWithId} from "shared/components/spreadsheet/dhx-spreadsheet/dhx-spreadsheet"
import {SpreadsheetCellType} from "shared/graphql/generated/globalTypes"
import {LocalSpreadsheet, SpreadsheetCell} from "shared/models"
import {SpreadsheetViewerStateActions} from "shared/office-tools"
import {
  initializeSpreadsheetAction,
  spreadsheetCellStyleChangeBatchedAction,
  spreadsheetCreateCellBatchedAction,
  spreadsheetTypeChangeAction,
  spreadsheetValueChangeAction,
  spreadsheetValueCreateAction
} from "shared/redux/actions/data/spreadsheet-action"
import {closeSpreadsheet, selectSpreadsheet} from "shared/redux/actions/ui/spreadsheet-viewer-action"

export const useSpreadsheetViewerStateActions = (): SpreadsheetViewerStateActions => {
  const dispatch = useDispatch()

  const initializeSpreadsheet = (spreadsheetId: UUID, spreadsheet: LocalSpreadsheet) =>
    dispatch(initializeSpreadsheetAction(spreadsheetId, spreadsheet))

  const selectSpreadsheetInternal = (spreadsheetId: UUID) => dispatch(selectSpreadsheet(spreadsheetId))

  const closeSpreadsheetInternal = (spreadsheetId: UUID) => dispatch(closeSpreadsheet(spreadsheetId))

  const createValueInternal = (spreadsheetId: UUID, cell: SpreadsheetCell) =>
    dispatch(spreadsheetValueCreateAction(spreadsheetId, cell))

  const changeValueInternal = (spreadsheetId: UUID, cellId: UUID, value: string) =>
    dispatch(spreadsheetValueChangeAction(spreadsheetId, cellId, value))

  const createCellBatchedInternal = (spreadsheetId: UUID, cells: Array<SpreadsheetCell>) =>
    dispatch(spreadsheetCreateCellBatchedAction(spreadsheetId, cells))

  const changeStyleBatchedInternal = (spreadsheetId: UUID, changes: Array<SpreadsheetStyleChangeWithId>) =>
    dispatch(spreadsheetCellStyleChangeBatchedAction(spreadsheetId, changes))

  const changeTypeInternal = (spreadsheetId: UUID, cellId: UUID, cellType: SpreadsheetCellType) =>
    dispatch(spreadsheetTypeChangeAction(spreadsheetId, cellId, cellType))

  return {
    initializeSpreadsheet,
    selectSpreadsheet: selectSpreadsheetInternal,
    closeSpreadsheet: closeSpreadsheetInternal,
    createValue: createValueInternal,
    changeValue: changeValueInternal,
    changeType: changeTypeInternal,
    changeStyleBatched: changeStyleBatchedInternal,
    createCellBatched: createCellBatchedInternal
  }
}
