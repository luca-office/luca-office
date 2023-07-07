import {useDispatch} from "react-redux"
import {ErpType, Sorting} from "shared/enums"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {ErpSurveyEvents} from "shared/models"
import {addSurveyEventAction} from "shared/redux/actions/data/survey-events-action"
import {createPreviewEvent} from "../../utils"

export const useErpSurveyEvents = (scenarioId: UUID): ErpSurveyEvents => {
  const dispatch = useDispatch()

  const sendErpExpandDirectory = (directoryName: string) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.ErpExpandDirectory, {scenarioId, directoryName})))

  const sendErpCollapseDirectory = (directoryName: string) =>
    dispatch(
      addSurveyEventAction(createPreviewEvent(SurveyEventType.ErpCollapseDirectory, {scenarioId, directoryName}))
    )

  const sendErpSelectTable = (tableType: ErpType | undefined, tableName: string, isDisabled: boolean) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.ErpSelectTable, {scenarioId, tableType, tableName, isDisabled})
      )
    )

  const sendErpSelectRow = (tableType: ErpType, rowId: number, rowIndex: number) =>
    dispatch(
      addSurveyEventAction(createPreviewEvent(SurveyEventType.ErpSelectRow, {scenarioId, tableType, rowId, rowIndex}))
    )

  const sendErpDeselectRow = (tableType: ErpType, rowId: number, rowIndex: number) =>
    dispatch(
      addSurveyEventAction(createPreviewEvent(SurveyEventType.ErpDeselectRow, {scenarioId, tableType, rowId, rowIndex}))
    )

  const sendErpSelectAllRows = (tableType: ErpType, rowsCount: number) =>
    dispatch(
      addSurveyEventAction(createPreviewEvent(SurveyEventType.ErpSelectAllRows, {scenarioId, tableType, rowsCount}))
    )

  const sendErpDeselectAllRows = (tableType: ErpType, rowsCount: number) =>
    dispatch(
      addSurveyEventAction(createPreviewEvent(SurveyEventType.ErpDeselectAllRows, {scenarioId, tableType, rowsCount}))
    )

  const sendErpSelectCell = (
    tableType: ErpType,
    rowId: number,
    rowIndex: number,
    columnName: string,
    columnIndex: number,
    value: string
  ) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.ErpSelectCell, {
          scenarioId,
          tableType,
          rowId,
          rowIndex,
          columnName,
          columnIndex,
          value
        })
      )
    )

  const sendErpCopyCellContentToClipboard = (
    tableType: ErpType,
    rowId: number,
    rowIndex: number,
    columnName: string,
    columnIndex: number,
    value: string
  ) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.ErpCopyCellContentToClipboard, {
          scenarioId,
          tableType,
          rowId,
          rowIndex,
          columnName,
          columnIndex,
          value
        })
      )
    )

  const sendErpSearchTable = (tableType: ErpType, query: string, resultsCount: number) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.ErpSearchTable, {scenarioId, tableType, query, resultsCount})
      )
    )

  const sendErpUpdateShowOnlySelectedRows = (tableType: ErpType, selectedRowsCount: number, value: boolean) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.ErpUpdateShowOnlySelectedRows, {
          scenarioId,
          tableType,
          selectedRowsCount,
          value
        })
      )
    )

  const sendErpSortTable = (tableType: ErpType, columnName: string, columnIndex: number, sorting: Sorting) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.ErpSortTable, {
          scenarioId,
          tableType,
          columnName,
          columnIndex,
          sorting
        })
      )
    )

  const sendErpOpenRow = (tableType: ErpType, rowId: number, rowIndex: number) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.ErpOpenRow, {
          scenarioId,
          tableType,
          rowId,
          rowIndex
        })
      )
    )

  const sendErpCloseRow = (tableType: ErpType, rowId: number, rowIndex: number) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.ErpCloseRow, {
          scenarioId,
          tableType,
          rowId,
          rowIndex,
          dispatch
        })
      )
    )

  const sendErpOpenAttachment = (tableType: ErpType, rowId: number, rowIndex: number, binaryFileId: UUID) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.ErpOpenAttachment, {
          scenarioId,
          tableType,
          rowId,
          rowIndex,
          binaryFileId
        })
      )
    )

  const sendErpCopyCoreDataToClipboard = (tableType: ErpType, rowId: number, rowIndex: number, value: string) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.ErpCopyCoreDataToClipboard, {
          scenarioId,
          tableType,
          rowId,
          rowIndex,
          value
        })
      )
    )

  const sendErpCopyCoreDataAndReferencesToClipboard = (
    tableType: ErpType,
    rowId: number,
    rowIndex: number,
    value: string
  ) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.ErpCopyCoreDataAndReferencesToClipboard, {
          scenarioId,
          tableType,
          rowId,
          rowIndex,
          value
        })
      )
    )

  const sendErpCopyReferenceToClipboard = (
    tableType: ErpType,
    rowId: number,
    rowIndex: number,
    columnName: string,
    value: string
  ) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.ErpCopyReferenceToClipboard, {
          scenarioId,
          tableType,
          rowId,
          rowIndex,
          columnName,
          value
        })
      )
    )

  const sendErpNavigateToReference = (
    tableType: ErpType,
    rowId: number,
    targetTableType: ErpType,
    targetRowId: number
  ) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.ErpNavigateToReference, {
          scenarioId,
          tableType,
          rowId,
          targetTableType,
          targetRowId
        })
      )
    )

  const sendErpNavigateBack = (tableType: ErpType, rowId: number, targetTableType: ErpType, targetRowId: number) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.ErpNavigateBack, {
          scenarioId,
          tableType,
          rowId,
          targetTableType,
          targetRowId
        })
      )
    )

  return {
    sendErpExpandDirectory,
    sendErpCollapseDirectory,
    sendErpSelectTable,
    sendErpSelectRow,
    sendErpDeselectRow,
    sendErpSelectAllRows,
    sendErpDeselectAllRows,
    sendErpSelectCell,
    sendErpCopyCellContentToClipboard,
    sendErpSearchTable,
    sendErpUpdateShowOnlySelectedRows,
    sendErpSortTable,
    sendErpOpenRow,
    sendErpCloseRow,
    sendErpOpenAttachment,
    sendErpCopyCoreDataToClipboard,
    sendErpCopyCoreDataAndReferencesToClipboard,
    sendErpCopyReferenceToClipboard,
    sendErpNavigateToReference,
    sendErpNavigateBack
  }
}
