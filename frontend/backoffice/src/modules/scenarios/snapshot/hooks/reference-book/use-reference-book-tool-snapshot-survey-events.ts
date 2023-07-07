import {noop} from "lodash-es"
import {ReferenceBookToolSurveyEvents} from "shared/office-tools/reference-book"

export const useReferenceBookToolSnapshotSurveyEvents = (): ReferenceBookToolSurveyEvents => {
  return {
    sendViewReferenceBookChapterEvent: noop,
    sendViewReferenceBookArticleEvent: noop,
    sendSearchReferenceBookEvent: noop,
    sendOpenImageBinaryEvent: noop,
    sendOpenVideoBinaryEvent: noop,
    sendOpenToolEvent: noop,
    sendRestoreToolEvent: noop,
    sendViewReferenceBookBinaryEvent: noop
  }
}
