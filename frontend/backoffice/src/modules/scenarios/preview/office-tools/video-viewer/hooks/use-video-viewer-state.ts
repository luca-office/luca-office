import {useBinaryViewer, UseBinaryViewerHook} from "shared/redux/hooks"
import {AppState} from "../../../../../../redux/state/app-state"

export const useVideoViewerState = (): UseBinaryViewerHook =>
  useBinaryViewer<AppState>("videoPlayer", state => state.playerPreview.player)
