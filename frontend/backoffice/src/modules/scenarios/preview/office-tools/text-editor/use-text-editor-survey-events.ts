import {useDispatch} from "react-redux"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {UpdateTextDocumentContentEventPayload} from "shared/models"
import {addSurveyEventAction} from "shared/redux/actions/data/survey-events-action"
import {createPreviewEvent} from "../../utils"

export interface TextDocumentSurveyEvents {
  sendUpdateTextDocumentEvent: (payload: UpdateTextDocumentContentEventPayload) => void
  sendCloseTextDocumentEvent: (textDocumentId: UUID) => void
}

export const useTextDocumentsSurveyEvents = (): TextDocumentSurveyEvents => {
  const dispatch = useDispatch()

  const sendUpdateTextDocumentEvent = (payload: UpdateTextDocumentContentEventPayload) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.UpdateTextDocumentContent, payload)))

  const sendCloseTextDocumentEvent = (textDocumentId: UUID) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.CloseTextDocument, {textDocumentId})))

  return {
    sendUpdateTextDocumentEvent,
    sendCloseTextDocumentEvent
  }
}
