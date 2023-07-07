import {noop} from "lodash-es"
import {TextDocumentSurveyEvents} from "shared/office-tools/text-editor/text-editor-container"

export const useTextDocumentsSnapshotSurveyEvents = (): TextDocumentSurveyEvents => {
  return {sendCloseTextDocumentEvent: noop, sendUpdateTextDocumentEvent: noop}
}
