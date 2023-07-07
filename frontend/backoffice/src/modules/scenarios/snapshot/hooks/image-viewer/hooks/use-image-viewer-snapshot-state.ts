import {useBinaryViewer, UseBinaryViewerHook} from "shared/redux/hooks"
import {AppState} from "../../../../../../redux/state/app-state"

export const useImageViewerSnapshotState = (): UseBinaryViewerHook =>
  useBinaryViewer<AppState>("imageViewer", state => state.playerPreview.player)
