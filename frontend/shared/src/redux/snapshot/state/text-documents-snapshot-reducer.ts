import {SurveyEventType} from "../../../graphql/generated/globalTypes"
import {SurveyEvent} from "../../../models"
import {SharedAppState} from "../../../redux/state"
import {TextDocumentsState} from "../../../redux/state/data"

export const textDocumentsSnapshotReducer = (state: SharedAppState, surveyEvent: SurveyEvent): TextDocumentsState => {
  const textDocuments = state.data.textDocuments

  switch (surveyEvent.eventType) {
    case SurveyEventType.UpdateTextDocumentContent: {
      const data = surveyEvent.data as {
        textDocumentId: UUID
        content: string
        title: string
        fileId: UUID
      }
      return {
        ...textDocuments,
        [data.textDocumentId]: {
          id: data.textDocumentId,
          title: data.title,
          content: data.content,
          fileId: data.fileId
        }
      }
    }
    default:
      return textDocuments
  }
}
