import {useDispatch} from "react-redux"
import {ErpType, Sorting} from "shared/enums"
import {ErpSurveyEvents} from "shared/models"
import {
  sendErpCloseRowEvent,
  sendErpCollapseDirectoryEvent,
  sendErpCopyCellContentToClipboardEvent,
  sendErpCopyCoreDataAndReferencesToClipboardEvent,
  sendErpCopyCoreDataToClipboardEvent,
  sendErpCopyReferenceToClipboardEvent,
  sendErpDeselectAllRowsEvent,
  sendErpDeselectRowEvent,
  sendErpExpandDirectoryEvent,
  sendErpNavigateBackEvent,
  sendErpNavigateToReferenceEvent,
  sendErpOpenAttachmentEvent,
  sendErpOpenRowEvent,
  sendErpSearchTableEvent,
  sendErpSelectAllRowsEvent,
  sendErpSelectCellEvent,
  sendErpSelectRowEvent,
  sendErpSelectTableEvent,
  sendErpSortTableEvent,
  sendErpUpdateShowOnlySelectedRowsEvent
} from "shared/utils/survey-events"
import {useGetSurveyInvitationFromRedux} from "../../../hooks/use-get-survey-invitation"

export const useErpSurveyEvents = (scenarioId: UUID): ErpSurveyEvents => {
  const {invitationIdOption, surveyIdOption} = useGetSurveyInvitationFromRedux()

  const dispatch = useDispatch()

  const withSurveyParams = (handler: (surveyId: UUID, invitationId: UUID, scenarioId: UUID) => void) =>
    surveyIdOption.forEach(surveyId =>
      invitationIdOption.forEach(invitationId => handler(surveyId, invitationId, scenarioId))
    )

  const sendErpExpandDirectory = (directoryName: string) => withSurveyParams(sendErpExpandDirectoryEvent(directoryName))

  const sendErpCollapseDirectory = (directoryName: string) =>
    withSurveyParams(sendErpCollapseDirectoryEvent(directoryName))

  const sendErpSelectTable = (tableType: ErpType | undefined, tableName: string, isDisabled: boolean) =>
    withSurveyParams(sendErpSelectTableEvent(tableType, tableName, isDisabled))

  const sendErpSelectRow = (tableType: ErpType, rowId: number, rowIndex: number) =>
    withSurveyParams(sendErpSelectRowEvent(tableType, rowId, rowIndex))

  const sendErpDeselectRow = (tableType: ErpType, rowId: number, rowIndex: number) =>
    withSurveyParams(sendErpDeselectRowEvent(tableType, rowId, rowIndex))

  const sendErpSelectAllRows = (tableType: ErpType, rowsCount: number) =>
    withSurveyParams(sendErpSelectAllRowsEvent(tableType, rowsCount))

  const sendErpDeselectAllRows = (tableType: ErpType, rowsCount: number) =>
    withSurveyParams(sendErpDeselectAllRowsEvent(tableType, rowsCount))

  const sendErpSelectCell = (
    tableType: ErpType,
    rowId: number,
    rowIndex: number,
    columnName: string,
    columnIndex: number,
    value: string
  ) => withSurveyParams(sendErpSelectCellEvent(tableType, rowId, rowIndex, columnName, columnIndex, value))

  const sendErpCopyCellContentToClipboard = (
    tableType: ErpType,
    rowId: number,
    rowIndex: number,
    columnName: string,
    columnIndex: number,
    value: string
  ) =>
    withSurveyParams(sendErpCopyCellContentToClipboardEvent(tableType, rowId, rowIndex, columnName, columnIndex, value))

  const sendErpSearchTable = (tableType: ErpType, query: string, resultsCount: number) =>
    withSurveyParams(sendErpSearchTableEvent(tableType, query, resultsCount))

  const sendErpUpdateShowOnlySelectedRows = (tableType: ErpType, selectedRowsCount: number, value: boolean) =>
    withSurveyParams(sendErpUpdateShowOnlySelectedRowsEvent(tableType, selectedRowsCount, value))

  const sendErpSortTable = (tableType: ErpType, columnName: string, columnIndex: number, sorting: Sorting) =>
    withSurveyParams(sendErpSortTableEvent(tableType, columnName, columnIndex, sorting))

  const sendErpOpenRow = (tableType: ErpType, rowId: number, rowIndex: number) =>
    withSurveyParams(sendErpOpenRowEvent(tableType, rowId, rowIndex, dispatch))

  const sendErpCloseRow = (tableType: ErpType, rowId: number, rowIndex: number) =>
    withSurveyParams(sendErpCloseRowEvent(tableType, rowId, rowIndex))

  const sendErpOpenAttachment = (tableType: ErpType, rowId: number, rowIndex: number, binaryFileId: UUID) =>
    withSurveyParams(sendErpOpenAttachmentEvent(tableType, rowId, rowIndex, binaryFileId))

  const sendErpCopyCoreDataToClipboard = (tableType: ErpType, rowId: number, rowIndex: number, value: string) =>
    withSurveyParams(sendErpCopyCoreDataToClipboardEvent(tableType, rowId, rowIndex, value))

  const sendErpCopyCoreDataAndReferencesToClipboard = (
    tableType: ErpType,
    rowId: number,
    rowIndex: number,
    value: string
  ) => withSurveyParams(sendErpCopyCoreDataAndReferencesToClipboardEvent(tableType, rowId, rowIndex, value))

  const sendErpCopyReferenceToClipboard = (
    tableType: ErpType,
    rowId: number,
    rowIndex: number,
    columnName: string,
    value: string
  ) => withSurveyParams(sendErpCopyReferenceToClipboardEvent(tableType, rowId, rowIndex, columnName, value))

  const sendErpNavigateToReference = (
    tableType: ErpType,
    rowId: number,
    targetTableType: ErpType,
    targetRowId: number
  ) => withSurveyParams(sendErpNavigateToReferenceEvent(tableType, rowId, targetTableType, targetRowId))

  const sendErpNavigateBack = (tableType: ErpType, rowId: number, targetTableType: ErpType, targetRowId: number) =>
    withSurveyParams(sendErpNavigateBackEvent(tableType, rowId, targetTableType, targetRowId))

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
