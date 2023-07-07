/* eslint-disable max-lines */
// List all possible survey events here

import * as clipboard from "clipboard-polyfill/text"
import {Dispatch} from "redux"
import {ErpType, OfficeWindowType, Sorting} from "../enums"
import {ProjectModuleEndType} from "../enums/project-module-end-type"
import {SurveyEventType} from "../graphql/generated/globalTypes"
import {
  Binary,
  EndQuestionnareEventPayload,
  EndScenarioEventPayload,
  EvaluateInterventionPayload,
  QuestionnaireBinaryFileEventPayload,
  QuestionnaireQuestionBinaryFileEventPayload,
  ReceiveEmailPayload,
  ReceiveSupervisorChatMessagePayload,
  SelectSpreadsheetCellEventPayload,
  SelectSpreadsheetCellRangeEventPayload,
  SelectSpreadsheetEventPayload,
  UpdateCellStyleSurveyEventPayload,
  UpdateCellTypeSurveyEventPayload,
  UpdateCellValueSurveyEventPayload,
  UpdateTextDocumentContentEventPayload
} from "../models"
import {CalculatorKey} from "../office-tools"
import {SharedAppAction} from "../redux/actions"
import {sendBaseSurveyEvent, sendQuestionnaireSurveyEvent, sendScenarioSurveyEvent} from "./survey-event"

// #region Common

export const sendOpenToolEvent = (tool: OfficeWindowType) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({surveyId, invitationId, scenarioId, eventType: SurveyEventType.OpenTool, data: {tool}})

export const sendCloseToolEvent = (tool: OfficeWindowType) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({surveyId, invitationId, scenarioId, eventType: SurveyEventType.CloseTool, data: {tool}})

export const sendMinimizeToolEvent = (tool: OfficeWindowType) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.MinimizeTool,
    data: {tool}
  })

export const sendRestoreToolEvent = (tool: OfficeWindowType) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.RestoreTool,
    data: {tool}
  })

export const sendStartScenarioEvent = () => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.StartScenario,
    data: {}
  })

export const sendResumeScenarioEvent = () => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ResumeScenario,
    data: {scenarioId}
  })

export const sendEndScenarioEvent = (endType: ProjectModuleEndType) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendBaseSurveyEvent<EndScenarioEventPayload>({
    surveyId,
    invitationId,
    eventType: SurveyEventType.EndScenario,
    data: {endType, scenarioId}
  })

export interface OpenBinaryEventProps {
  directoryId?: UUID
  fileId?: UUID
  binaryFileId: UUID
  binaryFileUrl: string
  binaryFileTitle: string
}

const createOpenBinaryEvent = (
  binaryEventType: SurveyEventType.OpenImageBinary | SurveyEventType.OpenPdfBinary | SurveyEventType.OpenVideoBinary
) => (
  {directoryId, fileId, binaryFileId, binaryFileUrl, binaryFileTitle}: OpenBinaryEventProps,
  dispatch?: Dispatch<SharedAppAction>
) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: binaryEventType,
    data: {
      directoryId,
      fileId,
      binaryFileId,
      binaryFileUrl,
      binaryFileTitle
    },
    dispatch
  })

export const sendOpenImageBinaryEvent = createOpenBinaryEvent(SurveyEventType.OpenImageBinary)
export const sendOpenVideoBinaryEvent = createOpenBinaryEvent(SurveyEventType.OpenVideoBinary)
export const sendOpenPdfBinaryEvent = createOpenBinaryEvent(SurveyEventType.OpenPdfBinary)

const createCloseBinaryEvent = (
  binaryEventType: SurveyEventType.CloseImageBinary | SurveyEventType.ClosePdfBinary | SurveyEventType.CloseVideoBinary
) => (binaryFileId: UUID) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: binaryEventType,
    data: {
      binaryFileId
    }
  })

export const sendCloseImageBinaryEvent = createCloseBinaryEvent(SurveyEventType.CloseImageBinary)
export const sendCloseVideoBinaryEvent = createCloseBinaryEvent(SurveyEventType.CloseVideoBinary)
export const sendClosePdfBinaryEvent = createCloseBinaryEvent(SurveyEventType.ClosePdfBinary)

const createSelectBinaryEvent = (
  binaryEventType:
    | SurveyEventType.SelectImageBinary
    | SurveyEventType.SelectPdfBinary
    | SurveyEventType.SelectVideoBinary
) => ({id, path, title}: Binary) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: binaryEventType,
    data: {
      binaryFileId: id,
      binaryFileUrl: path,
      binaryFileTitle: title ?? ""
    }
  })

export const sendSelectImageBinaryEvent = createSelectBinaryEvent(SurveyEventType.SelectImageBinary)
export const sendSelectPdfBinaryEvent = createSelectBinaryEvent(SurveyEventType.SelectPdfBinary)
export const sendSelectVideoBinaryEvent = createSelectBinaryEvent(SurveyEventType.SelectVideoBinary)

export interface OpenSpreadsheetEventProps {
  directoryId?: UUID
  fileId: UUID
  spreadsheetId: UUID
  spreadsheetTitle: string
}

export const sendOpenSpreadsheetEvent = (
  {directoryId, fileId, spreadsheetId, spreadsheetTitle}: OpenSpreadsheetEventProps,
  dispatch: Dispatch<SharedAppAction>
) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.OpenSpreadsheet,
    data: {
      directoryId,
      fileId,
      spreadsheetId,
      spreadsheetTitle
    },
    dispatch
  })

export const sendSelectSpreadsheetEvent = (payload: SelectSpreadsheetEventPayload) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.SelectSpreadsheet,
    data: payload
  })

export const sendCloseSpreadsheetEvent = (spreadsheetId: UUID) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.CloseSpreadsheet,
    data: {spreadsheetId}
  })

export const sendClipboardEvent = (eventType: SurveyEventType) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) => {
  /*
   * Info: The use of a polyfill is necessary, because the current version of firefox does not
   * support navigator.clipboard.readText
   *
   * readText() needs user permission, if user denies, clipboardEvent should still be tracked.
   * This is done by sending an empty string
   */
  clipboard
    .readText()
    .catch(() => Promise.resolve(""))
    .then(content =>
      sendScenarioSurveyEvent({
        surveyId,
        invitationId,
        scenarioId,
        eventType: eventType,
        data: {content, scenarioId}
      })
    )
}
// #endregion

// #region TextDocuments
export interface OpenTextDocumentEventProps {
  directoryId?: UUID
  fileId: UUID
  textDocumentId: UUID
  textDocumentTitle: string
}

export const sendOpenTextDocumentSurveyEvent = (
  {directoryId, fileId, textDocumentTitle, textDocumentId}: OpenTextDocumentEventProps,
  dispatch?: Dispatch<SharedAppAction>
) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.OpenTextDocument,
    data: {directoryId, fileId, textDocumentId, textDocumentTitle},
    dispatch
  })

export const sendCloseTextDocumentSurveyEvent = (textDocumentId: UUID) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.CloseTextDocument,
    data: {textDocumentId}
  })

export const sendUpdateTextDocumentSurveyEvent = (
  payload: UpdateTextDocumentContentEventPayload,
  dispatch?: Dispatch<any>
) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.UpdateTextDocumentContent,
    data: payload,
    dispatch
  })

// #endregion

// #region Calculator

export const sendCalculatorKeyPressedEvent = (scenarioId: UUID, key: CalculatorKey) => (
  surveyId: UUID,
  invitationId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.CalculatorKeyPressed,
    data: {key}
  })

// #endregion

// #region Spreadsheet

export const sendUpdateSpreadsheetCellValueEvent = (
  {fileId, spreadsheetId, rowIndex, columnIndex, cellId, cellType, value}: UpdateCellValueSurveyEventPayload,
  dispatch?: Dispatch<SharedAppAction>
) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.UpdateSpreadsheetCellValue,
    data: {
      fileId,
      spreadsheetId,
      rowIndex,
      columnIndex,
      cellId,
      cellType,
      value
    },
    dispatch
  })

export const sendUpdateSpreadsheetCellTypeEvent = ({
  fileId,
  spreadsheetId,
  cellId,
  rowIndex,
  columnIndex,
  cellType,
  value
}: UpdateCellTypeSurveyEventPayload) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.UpdateSpreadsheetCellType,
    data: {fileId, spreadsheetId, cellId, rowIndex, columnIndex, cellType, value}
  })

export const sendSelectSpreadsheetCellEvent = (payload: SelectSpreadsheetCellEventPayload) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.SelectSpreadsheetCell,
    data: payload
  })

export const sendSelectSpreadsheetCellRange = (payload: SelectSpreadsheetCellRangeEventPayload) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.SelectSpreadsheetCellRange,
    data: payload
  })

export const sendUpdateSpreadsheetCellStyle = (payload: UpdateCellStyleSurveyEventPayload) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.UpdateSpreadsheetCellStyle,
    data: payload
  })

// #endregion

// #region Questionnaire

const createSendAnswerEvent = (eventType: SurveyEventType, dispatch?: Dispatch) => (
  questionnaireId: UUID,
  questionId: UUID,
  answerId: UUID,
  questionPosition: number,
  answerPosition: number,
  value: string
) => (surveyId: UUID, invitationId: UUID, scenarioId?: UUID) =>
  sendQuestionnaireSurveyEvent({
    surveyId,
    invitationId,
    questionnaireId,
    scenarioId,
    eventType,
    data: {questionnaireId, questionId, answerId, questionPosition, answerPosition, value},
    dispatch
  })

const createSendFreetextAnswerEvent = (eventType: SurveyEventType, dispatch?: Dispatch) => (
  questionnaireId: UUID,
  questionId: UUID,
  questionPosition: number,
  answerPosition: number,
  value: string
) => (surveyId: UUID, invitationId: UUID, scenarioId?: UUID) =>
  sendQuestionnaireSurveyEvent({
    surveyId,
    invitationId,
    questionnaireId,
    scenarioId,
    eventType,
    data: {questionnaireId, questionId, questionPosition, answerPosition, value},
    dispatch
  })

const createSendQuestionnaireEvent = (eventType: SurveyEventType) => (questionnaireId: UUID) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId?: UUID
) =>
  sendQuestionnaireSurveyEvent({
    surveyId,
    invitationId,
    questionnaireId,
    scenarioId,
    eventType,
    data: {questionnaireId}
  })

export const sendUpdateQuestionnaireFreeTextAnswerEvent = (
  questionnaireId: UUID,
  questionId: UUID,
  value: string,
  questionPosition: number,
  answerPosition?: number
) => (surveyId: UUID, invitationId: UUID, scenarioId?: UUID) =>
  sendQuestionnaireSurveyEvent({
    surveyId,
    invitationId,
    questionnaireId,
    scenarioId,
    eventType: SurveyEventType.UpdateQuestionnaireFreeTextAnswer,
    data: {
      questionnaireId,
      questionId,
      value,
      questionPosition,
      answerPosition,
      scenarioId
    }
  })

const createSendQuestionnairePayloadEvent = <T>(eventType: SurveyEventType) => (questionnaireId: UUID, payload: T) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId?: UUID
) =>
  sendQuestionnaireSurveyEvent({
    surveyId,
    invitationId,
    eventType,
    questionnaireId,
    scenarioId,
    data: payload
  })

export const sendStartQuestionnaireEvent = createSendQuestionnaireEvent(SurveyEventType.StartQuestionnaire)

export const sendQuestionnaireQuestionVideoPlaybackEndedEvent = createSendQuestionnairePayloadEvent<QuestionnaireQuestionBinaryFileEventPayload>(
  SurveyEventType.QuestionnaireQuestionVideoPlaybackEnded
)

export const sendPlayQuestionnaireQuestionVideoEvent = createSendQuestionnairePayloadEvent<QuestionnaireQuestionBinaryFileEventPayload>(
  SurveyEventType.PlayQuestionnaireQuestionVideo
)

export const sendSelectQuestionnaireAnswerEvent = (dispatch?: Dispatch) =>
  createSendAnswerEvent(SurveyEventType.SelectQuestionnaireAnswer, dispatch)

export const sendStartEventEvent = createSendQuestionnaireEvent(SurveyEventType.StartEvent)

export const sendLeaveFullscreenQuestionnaireVideoEvent = createSendQuestionnairePayloadEvent<QuestionnaireBinaryFileEventPayload>(
  SurveyEventType.LeaveFullscreenQuestionnaireVideo
)

export const sendLeaveFullscreenQuestionnaireQuestionVideoEvent = createSendQuestionnairePayloadEvent<QuestionnaireQuestionBinaryFileEventPayload>(
  SurveyEventType.LeaveFullscreenQuestionnaireQuestionVideo
)

export const sendDeselectQuestionnaireAnswerEvent = (dispatch?: Dispatch) =>
  createSendAnswerEvent(SurveyEventType.DeselectQuestionnaireAnswer, dispatch)

export const sendSelectQuestionnaireFreeTextAnswerEvent = createSendFreetextAnswerEvent(
  SurveyEventType.SelectQuestionnaireFreetextAnswer
)

export const sendDeselectQuestionnaireFreeTextAnswerEvent = createSendFreetextAnswerEvent(
  SurveyEventType.DeselectQuestionnaireFreetextAnswer
)

export const sendQuestionnaireVideoPlaybackEndedEvent = createSendQuestionnairePayloadEvent<QuestionnaireBinaryFileEventPayload>(
  SurveyEventType.QuestionnaireVideoPlaybackEnded
)

export const sendEnlargeQuestionnaireQuestionBinaryEvent = createSendQuestionnairePayloadEvent<QuestionnaireQuestionBinaryFileEventPayload>(
  SurveyEventType.EnlargeQuestionnaireQuestionBinary
)

export const sendEnterFullscreenQuestionnaireQuestionVideoEvent = createSendQuestionnairePayloadEvent<QuestionnaireQuestionBinaryFileEventPayload>(
  SurveyEventType.EnterFullscreenQuestionnaireQuestionVideo
)

export const sendPauseQuestionnaireVideoEvent = createSendQuestionnairePayloadEvent<QuestionnaireBinaryFileEventPayload>(
  SurveyEventType.PauseQuestionnaireVideo
)

export const sendResumeQuestionnaireEvent = createSendQuestionnaireEvent(SurveyEventType.ResumeQuestionnaire)

export const sendPauseQuestionnaireQuestionVideoEvent = createSendQuestionnairePayloadEvent<QuestionnaireQuestionBinaryFileEventPayload>(
  SurveyEventType.PauseQuestionnaireQuestionVideo
)

export const sendEndEventEvent = createSendQuestionnaireEvent(SurveyEventType.EndEvent)

export const sendEndQuestionnaireEvent = createSendQuestionnairePayloadEvent<EndQuestionnareEventPayload>(
  SurveyEventType.EndQuestionnaire
)

export const sendEnlargeQuestionnaireBinaryEvent = createSendQuestionnairePayloadEvent<QuestionnaireBinaryFileEventPayload>(
  SurveyEventType.EnlargeQuestionnaireBinary
)

export const sendPlayQuestionnaireVideoEvent = createSendQuestionnairePayloadEvent<QuestionnaireBinaryFileEventPayload>(
  SurveyEventType.PlayQuestionnaireVideo
)

export const sendShrinkQuestionnaireBinaryEvent = createSendQuestionnairePayloadEvent<QuestionnaireBinaryFileEventPayload>(
  SurveyEventType.ShrinkQuestionnaireBinary
)

export const sendEnterFullscreenQuestionnaireVideoEvent = createSendQuestionnairePayloadEvent<QuestionnaireBinaryFileEventPayload>(
  SurveyEventType.EnterFullscreenQuestionnaireVideo
)

export const sendShrinkQuestionnaireQuestionBinaryEvent = createSendQuestionnairePayloadEvent<QuestionnaireQuestionBinaryFileEventPayload>(
  SurveyEventType.ShrinkQuestionnaireQuestionBinary
)

// #endregion

// #region Erp

export const sendErpExpandDirectoryEvent = (directoryName: string) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpExpandDirectory,
    data: {scenarioId, directoryName}
  })

export const sendErpCollapseDirectoryEvent = (directoryName: string) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpCollapseDirectory,
    data: {directoryName}
  })

export const sendErpSelectTableEvent = (tableType: ErpType | undefined, tableName: string, isDisabled: boolean) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpSelectTable,
    data: {
      tableType,
      tableName,
      isDisabled
    }
  })

export const sendErpSelectRowEvent = (tableType: ErpType, rowId: number, rowIndex: number) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpSelectRow,
    data: {
      tableType,
      rowId,
      rowIndex
    }
  })

export const sendErpDeselectRowEvent = (tableType: ErpType, rowId: number, rowIndex: number) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpDeselectRow,
    data: {
      tableType,
      rowId,
      rowIndex
    }
  })

export const sendErpSelectAllRowsEvent = (tableType: ErpType, rowsCount: number) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpSelectAllRows,
    data: {
      tableType,
      rowsCount
    }
  })

export const sendErpDeselectAllRowsEvent = (tableType: ErpType, rowsCount: number) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpDeselectAllRows,
    data: {
      tableType,
      rowsCount
    }
  })

export const sendErpSelectCellEvent = (
  tableType: ErpType,
  rowId: number,
  rowIndex: number,
  columnName: string,
  columnIndex: number,
  value: string
) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpSelectCell,
    data: {
      tableType,
      rowId,
      rowIndex,
      columnName,
      columnIndex,
      value
    }
  })

export const sendErpCopyCellContentToClipboardEvent = (
  tableType: ErpType,
  rowId: number,
  rowIndex: number,
  columnName: string,
  columnIndex: number,
  value: string
) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpCopyCellContentToClipboard,
    data: {
      tableType,
      rowId,
      rowIndex,
      columnName,
      columnIndex,
      value
    }
  })

export const sendErpSearchTableEvent = (tableType: ErpType, query: string, resultsCount: number) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpSearchTable,
    data: {
      tableType,
      query,
      resultsCount
    }
  })

export const sendErpUpdateShowOnlySelectedRowsEvent = (
  tableType: ErpType,
  selectedRowsCount: number,
  value: boolean
) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpUpdateShowOnlySelectedRows,
    data: {
      tableType,
      selectedRowsCount,
      value
    }
  })

export const sendErpSortTableEvent = (
  tableType: ErpType,
  columnName: string,
  columnIndex: number,
  sorting: Sorting
) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpSortTable,
    data: {
      tableType,
      columnName,
      columnIndex,
      sorting
    }
  })

export const sendErpOpenRowEvent = (
  tableType: ErpType,
  rowId: number,
  rowIndex: number,
  dispatch: Dispatch<SharedAppAction>
) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpOpenRow,
    data: {
      tableType,
      rowId,
      rowIndex
    },
    dispatch
  })

export const sendErpCloseRowEvent = (tableType: ErpType, rowId: number, rowIndex: number) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpCloseRow,
    data: {
      tableType,
      rowId,
      rowIndex
    }
  })

export const sendErpOpenAttachmentEvent = (tableType: ErpType, rowId: number, rowIndex: number, binaryFileId: UUID) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpOpenAttachment,
    data: {
      tableType,
      rowId,
      rowIndex,
      binaryFileId
    }
  })

export const sendErpCopyCoreDataToClipboardEvent = (
  tableType: ErpType,
  rowId: number,
  rowIndex: number,
  value: string
) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpCopyCoreDataToClipboard,
    data: {
      tableType,
      rowId,
      rowIndex,
      value
    }
  })

export const sendErpCopyCoreDataAndReferencesToClipboardEvent = (
  tableType: ErpType,
  rowId: number,
  rowIndex: number,
  value: string
) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpCopyCoreDataAndReferencesToClipboard,
    data: {
      tableType,
      rowId,
      rowIndex,
      value
    }
  })

export const sendErpCopyReferenceToClipboardEvent = (
  tableType: ErpType,
  rowId: number,
  rowIndex: number,
  columnName: string,
  value: string
) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpCopyReferenceToClipboard,
    data: {
      tableType,
      rowId,
      rowIndex,
      columnName,
      value
    }
  })

export const sendErpNavigateToReferenceEvent = (
  tableType: ErpType,
  rowId: number,
  targetTableType: ErpType,
  targetRowId: number
) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpNavigateToReference,
    data: {
      tableType,
      rowId,
      targetTableType,
      targetRowId
    }
  })

export const sendErpNavigateBackEvent = (
  tableType: ErpType,
  rowId: number,
  targetTableType: ErpType,
  targetRowId: number
) => (surveyId: UUID, invitationId: UUID, scenarioId: UUID) =>
  sendScenarioSurveyEvent({
    surveyId,
    invitationId,
    scenarioId,
    eventType: SurveyEventType.ErpNavigateBack,
    data: {
      tableType,
      rowId,
      targetTableType,
      targetRowId
    }
  })

// #endregion

// #region  Chat
export const sendReceiveSupervisorChatMessageEvent = (message: string) => (surveyId: UUID, invitationId: UUID) =>
  sendBaseSurveyEvent<ReceiveSupervisorChatMessagePayload>({
    surveyId,
    invitationId,
    eventType: SurveyEventType.ReceiveSupervisorChatMessage,
    data: {
      message
    }
  })

// //#endregion

//#region Email
export const sendReceiveEmailEvent = (emailId: UUID, interventionId: UUID | null) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendBaseSurveyEvent<ReceiveEmailPayload>({
    surveyId,
    invitationId,
    eventType: SurveyEventType.ReceiveEmail,
    data: {
      scenarioId,
      emailId,
      interventionId
    }
  })

//#endregion

//#region Intervention
export const sendEvaluateInterventionEvent = (interventionId: UUID, occurred: boolean) => (
  surveyId: UUID,
  invitationId: UUID,
  scenarioId: UUID
) =>
  sendBaseSurveyEvent<EvaluateInterventionPayload>({
    surveyId,
    invitationId,
    eventType: SurveyEventType.EvaluateIntervention,
    data: {
      scenarioId,
      occurred,
      interventionId
    }
  })

//#endregion
