import {useBinaryViewer, UseBinaryViewerHook} from "shared/redux/hooks"
import {AppState} from "../../../../../../redux/state/app-state"

export const usePdfViewerSnapshotState = (): UseBinaryViewerHook =>
  useBinaryViewer<AppState>("pdfViewer", state => state.playerPreview.player)
