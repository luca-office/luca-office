import {noop} from "lodash-es"
import {VideoViewerContainerSurveyEvents} from "shared/office-tools"

export const useVideoViewerSnapshotSurveyEvents = (): VideoViewerContainerSurveyEvents => {
  return {
    sendPlayVideoEvent: noop,
    sendPauseVideoEvent: noop,
    sendCloseBinaryEvent: noop,
    sendSelectVideoEvent: noop
  }
}
