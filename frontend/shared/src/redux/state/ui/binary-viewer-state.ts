import {Binary} from "../../../models"
import {Option} from "../../../utils/option"

export interface BinaryState {
  readonly openBinaries: Binary[]
  readonly selectedBinaryId: Option<UUID>
}

export interface BinaryViewerState {
  readonly imageViewer: BinaryState
  readonly pdfViewer: BinaryState
  readonly videoPlayer: BinaryState
}

export const initialBinaryState: BinaryState = {
  openBinaries: [],
  selectedBinaryId: Option.none<UUID>()
}

export const initialBinaryViewerState: BinaryViewerState = {
  imageViewer: initialBinaryState,
  pdfViewer: initialBinaryState,
  videoPlayer: initialBinaryState
}
