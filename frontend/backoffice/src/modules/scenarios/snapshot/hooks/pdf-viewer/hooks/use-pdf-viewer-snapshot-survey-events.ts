import {noop} from "lodash-es"
import {PdfViewerSurveyEvents} from "shared/office-tools"

export const usePdfViewerSnapshotSurveyEvents = (): PdfViewerSurveyEvents => {
  return {sendCloseBinaryEvent: noop, sendSelectPdfEvent: noop}
}
