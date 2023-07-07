import {useDispatch} from "react-redux"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {
  SelectSpreadsheetCellEventPayload,
  SelectSpreadsheetCellRangeEventPayload,
  SelectSpreadsheetEventPayload,
  UpdateCellStyleSurveyEventPayload,
  UpdateCellTypeSurveyEventPayload,
  UpdateCellValueSurveyEventPayload
} from "shared/models"
import {SpreadsheetViewerSurveyEvents} from "shared/office-tools"
import {addSurveyEventAction} from "shared/redux/actions/data/survey-events-action"
import {createPreviewEvent} from "../../utils"

export const useSpreadsheetViewerSurveyEvents = (): SpreadsheetViewerSurveyEvents => {
  const dispatch = useDispatch()

  const sendSelectCellEvent = (payload: SelectSpreadsheetCellEventPayload) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.SelectSpreadsheetCell, payload)))

  const sendRangeSelectionEvent = (payload: SelectSpreadsheetCellRangeEventPayload) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.SelectSpreadsheetCellRange, payload)))

  const sendUpdateCellValueEvent = (eventProps: UpdateCellValueSurveyEventPayload) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.UpdateSpreadsheetCellValue, {...eventProps})))

  const sendUpdateCellTypeEvent = (eventProps: UpdateCellTypeSurveyEventPayload) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.UpdateSpreadsheetCellType, {...eventProps})))

  const sendCloseSpreadsheetEvent = (spreadsheetId: UUID) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.CloseSpreadsheet, {spreadsheetId})))

  const sendUpdateCellStyleEvent = (payload: UpdateCellStyleSurveyEventPayload) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.UpdateSpreadsheetCellStyle, payload)))

  const sendSelectSpreadsheetEvent = (payload: SelectSpreadsheetEventPayload) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.SelectSpreadsheet, payload)))

  return {
    sendSelectCellEvent,
    sendRangeSelectionEvent,
    sendUpdateCellValueEvent,
    sendUpdateCellTypeEvent,
    sendCloseSpreadsheetEvent,
    sendUpdateCellStyleEvent,
    sendSelectSpreadsheetEvent
  }
}
