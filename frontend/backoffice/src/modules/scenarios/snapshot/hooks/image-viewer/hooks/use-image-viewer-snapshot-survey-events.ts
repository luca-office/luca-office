import {noop} from "lodash-es"
import {ImageViewerSurveyEvents} from "shared/office-tools"

export const useImageViewerSnapshotSurveyEvents = (): ImageViewerSurveyEvents => {
  return {sendCloseBinaryEvent: noop, sendSelectImageEvent: noop}
}
