import {useBinaryViewer, UseBinaryViewerHook} from "shared/redux/hooks"
import {AppState} from "../../../../../../redux/state/app-state"

export const useVideoViewerSnapshotState = (): UseBinaryViewerHook =>
  useBinaryViewer<AppState>("videoPlayer", state => state.playerPreview.player)
