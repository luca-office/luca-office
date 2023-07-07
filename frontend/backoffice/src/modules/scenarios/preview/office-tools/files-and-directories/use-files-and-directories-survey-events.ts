import {useDispatch} from "react-redux"
import {OfficeWindowType} from "shared/enums"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {ViewDirectorySurveyEventPayload, ViewFileSurveyEventPayload} from "shared/models"
import {FilesAndDirectoriesSurveyEvents} from "shared/office-tools/files-and-directories"
import {addSurveyEventAction} from "shared/redux/actions/data/survey-events-action"
import {OpenBinaryEventProps, OpenSpreadsheetEventProps, OpenTextDocumentEventProps} from "shared/utils"
import {createPreviewEvent} from "../../utils"

export const useFilesAndDirectoriesSurveyEvents = (scenarioId: UUID): FilesAndDirectoriesSurveyEvents => {
  const dispatch = useDispatch()

  const sendOpenToolEvent = (tool: OfficeWindowType) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.OpenTool, {tool})))

  const sendRestoreToolEvent = (tool: OfficeWindowType) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.RestoreTool, {tool})))

  const sendViewDirectoryEvent = (payload: ViewDirectorySurveyEventPayload) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.ViewDirectory, payload)))

  const sendViewFileEvent = (payload: ViewFileSurveyEventPayload) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.ViewFile, payload)))

  const sendViewDownloadsDirectoryEvent = () =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.ViewDownloadsDirectory, {scenarioId})))

  const sendOpenImageBinaryEvent = (props: OpenBinaryEventProps) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.OpenImageBinary, {scenarioId, ...props})))

  const sendOpenVideoBinaryEvent = (props: OpenBinaryEventProps) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.OpenVideoBinary, {scenarioId, ...props})))

  const sendOpenPdfBinaryEvent = (props: OpenBinaryEventProps) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.OpenPdfBinary, {scenarioId, ...props})))

  const sendOpenSpreadsheetEvent = (props: OpenSpreadsheetEventProps) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.OpenSpreadsheet, {scenarioId, ...props})))

  const sendOpenTextDocumentEvent = (props: OpenTextDocumentEventProps) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.OpenTextDocument, {scenarioId, ...props})))

  return {
    sendOpenToolEvent,
    sendRestoreToolEvent,
    sendViewDirectoryEvent,
    sendViewFileEvent,
    sendViewDownloadsDirectoryEvent,
    sendOpenSpreadsheetEvent,
    sendOpenImageBinaryEvent,
    sendOpenPdfBinaryEvent,
    sendOpenVideoBinaryEvent,
    sendOpenTextDocumentEvent
  }
}
