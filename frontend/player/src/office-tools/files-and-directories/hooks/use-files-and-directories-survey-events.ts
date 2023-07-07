import {useDispatch} from "react-redux"
import {OfficeWindowType} from "shared/enums"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {ViewDirectorySurveyEventPayload, ViewFileSurveyEventPayload} from "shared/models"
import {FilesAndDirectoriesSurveyEvents} from "shared/office-tools/files-and-directories"
import {
  OpenBinaryEventProps,
  OpenSpreadsheetEventProps,
  OpenTextDocumentEventProps,
  sendOpenImageBinaryEvent,
  sendOpenPdfBinaryEvent,
  sendOpenSpreadsheetEvent,
  sendOpenTextDocumentSurveyEvent,
  sendOpenToolEvent,
  sendOpenVideoBinaryEvent,
  sendRestoreToolEvent,
  sendScenarioSurveyEvent
} from "shared/utils"
import {useGetSurveyInvitationFromRedux} from "../../../hooks/use-get-survey-invitation"

export const useFilesAndDirectoriesSurveyEvents = (scenarioId: UUID): FilesAndDirectoriesSurveyEvents => {
  const {invitationIdOption, surveyIdOption} = useGetSurveyInvitationFromRedux()
  const dispatch = useDispatch()

  const withSurveyParams = (handler: (surveyId: UUID, invitation: UUID, scenarioId: UUID) => void) =>
    invitationIdOption.forEach(invitationId =>
      surveyIdOption.forEach(surveyId => handler(surveyId, invitationId, scenarioId))
    )

  const sendViewDirectoryEventInternal = (payload: ViewDirectorySurveyEventPayload) => (
    surveyId: UUID,
    invitationId: UUID,
    scenarioId: UUID
  ) =>
    sendScenarioSurveyEvent({
      surveyId,
      invitationId,
      scenarioId,
      eventType: SurveyEventType.ViewDirectory,
      data: payload,
      dispatch
    })

  const sendViewFileEventInternal = (payload: ViewFileSurveyEventPayload) => (
    surveyId: UUID,
    invitationId: UUID,
    scenarioId: UUID
  ) =>
    sendScenarioSurveyEvent({
      surveyId,
      invitationId,
      scenarioId,
      eventType: SurveyEventType.ViewFile,
      data: payload,
      dispatch
    })

  const sendViewDownloadsDirectoryEventInternal = (scenarioId: UUID) => (surveyId: UUID, invitationId: UUID) =>
    sendScenarioSurveyEvent({
      surveyId,
      invitationId,
      scenarioId,
      eventType: SurveyEventType.ViewDownloadsDirectory,
      data: {scenarioId}
    })

  const sendOpenImageBinaryEventInternal = (payload: OpenBinaryEventProps) =>
    withSurveyParams(sendOpenImageBinaryEvent(payload, dispatch))

  const sendOpenVideoBinaryEventInternal = (payload: OpenBinaryEventProps) =>
    withSurveyParams(sendOpenVideoBinaryEvent(payload, dispatch))

  const sendOpenPdfBinaryEventInternal = (payload: OpenBinaryEventProps) =>
    withSurveyParams(sendOpenPdfBinaryEvent(payload, dispatch))

  const sendOpenTextDocumentEventInternal = (payload: OpenTextDocumentEventProps) =>
    withSurveyParams(sendOpenTextDocumentSurveyEvent(payload, dispatch))

  const sendOpenSpreadsheetEventInternal = (payload: OpenSpreadsheetEventProps) =>
    withSurveyParams(sendOpenSpreadsheetEvent(payload, dispatch))

  return {
    sendOpenToolEvent: (tool: OfficeWindowType) => withSurveyParams(sendOpenToolEvent(tool)),
    sendRestoreToolEvent: (tool: OfficeWindowType) => withSurveyParams(sendRestoreToolEvent(tool)),
    sendViewDirectoryEvent: (payload: ViewDirectorySurveyEventPayload) =>
      withSurveyParams(sendViewDirectoryEventInternal(payload)),
    sendViewFileEvent: (payload: ViewFileSurveyEventPayload) => withSurveyParams(sendViewFileEventInternal(payload)),
    sendViewDownloadsDirectoryEvent: () => withSurveyParams(sendViewDownloadsDirectoryEventInternal(scenarioId)),
    sendOpenImageBinaryEvent: sendOpenImageBinaryEventInternal,
    sendOpenVideoBinaryEvent: sendOpenVideoBinaryEventInternal,
    sendOpenPdfBinaryEvent: sendOpenPdfBinaryEventInternal,
    sendOpenSpreadsheetEvent: sendOpenSpreadsheetEventInternal,
    sendOpenTextDocumentEvent: sendOpenTextDocumentEventInternal
  }
}
