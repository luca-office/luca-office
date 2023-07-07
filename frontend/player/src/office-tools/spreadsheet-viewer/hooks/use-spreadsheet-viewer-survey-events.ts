import {useDispatch} from "react-redux"
import {
  SelectSpreadsheetCellEventPayload,
  SelectSpreadsheetCellRangeEventPayload,
  SelectSpreadsheetEventPayload,
  UpdateCellStyleSurveyEventPayload,
  UpdateCellTypeSurveyEventPayload,
  UpdateCellValueSurveyEventPayload
} from "shared/models"
import {SpreadsheetViewerSurveyEvents} from "shared/office-tools"
import {
  sendCloseSpreadsheetEvent,
  sendSelectSpreadsheetCellEvent,
  sendSelectSpreadsheetCellRange,
  sendSelectSpreadsheetEvent,
  sendUpdateSpreadsheetCellStyle,
  sendUpdateSpreadsheetCellTypeEvent,
  sendUpdateSpreadsheetCellValueEvent
} from "shared/utils"
import {useGetSurveyInvitationFromRedux} from "../../../hooks/use-get-survey-invitation"

export const useSpreadsheetViewerSurveyEvents = (scenarioId: UUID): SpreadsheetViewerSurveyEvents => {
  const {invitationIdOption, surveyIdOption} = useGetSurveyInvitationFromRedux()

  const withSurveyParams = (handler: (surveyId: UUID, invitationId: UUID, scenarioId: UUID) => void) =>
    surveyIdOption.forEach(surveyId =>
      invitationIdOption.forEach(invitationId => handler(surveyId, invitationId, scenarioId))
    )

  const dispatch = useDispatch()
  const sendSelectCellEvent = (payload: SelectSpreadsheetCellEventPayload) =>
    withSurveyParams(sendSelectSpreadsheetCellEvent(payload))

  const sendRangeSelectionEvent = (payload: SelectSpreadsheetCellRangeEventPayload) =>
    withSurveyParams(sendSelectSpreadsheetCellRange(payload))

  const sendUpdateCellValueEvent = (payload: UpdateCellValueSurveyEventPayload) =>
    withSurveyParams(sendUpdateSpreadsheetCellValueEvent(payload, dispatch))

  const sendUpdateCellStyleEvent = (payload: UpdateCellStyleSurveyEventPayload) =>
    withSurveyParams(sendUpdateSpreadsheetCellStyle(payload))

  const sendUpdateCellTypeEvent = (eventProps: UpdateCellTypeSurveyEventPayload) =>
    withSurveyParams(sendUpdateSpreadsheetCellTypeEvent(eventProps))

  const sendCloseSpreadsheetEventInternal = (spreadsheetId: UUID) =>
    withSurveyParams(sendCloseSpreadsheetEvent(spreadsheetId))

  const sendSelectSpreadsheetEventInternal = (payload: SelectSpreadsheetEventPayload) =>
    withSurveyParams(sendSelectSpreadsheetEvent(payload))

  return {
    sendSelectCellEvent,
    sendRangeSelectionEvent,
    sendUpdateCellValueEvent,
    sendUpdateCellTypeEvent,
    sendUpdateCellStyleEvent,
    sendCloseSpreadsheetEvent: sendCloseSpreadsheetEventInternal,
    sendSelectSpreadsheetEvent: sendSelectSpreadsheetEventInternal
  }
}
