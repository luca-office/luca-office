import {SurveyEventType} from "../../../graphql/generated/globalTypes"
import {SurveyEvent} from "../../../models"
import {SharedAppState} from "../../../redux/state"
import {TextDocumentViewerState} from "../../../redux/state/ui/text-document-viewer-state"

export const textDocumentViewerSnapshotReducer = (
  state: SharedAppState,
  surveyEvent: SurveyEvent
): TextDocumentViewerState => {
  const textDocumentViewer = state.ui.textDocumentViewer
  switch (surveyEvent.eventType) {
    case SurveyEventType.OpenTextDocument:
      const data = surveyEvent.data as {
        directoryId?: UUID
        fileId: UUID
        textDocumentId: UUID
        textDocumentTitle: string
      }
      return {
        ...textDocumentViewer,
        selectedTextDocumentId: data.textDocumentId
      }
    case SurveyEventType.CloseTextDocument:
      return {...textDocumentViewer, selectedTextDocumentId: null}
    default:
      return textDocumentViewer
  }
}
