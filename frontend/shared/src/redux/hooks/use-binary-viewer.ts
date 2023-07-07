import {useDispatch, useSelector} from "react-redux"
import {Binary} from "../../models"
import {Option} from "../../utils"
import {closeBinary, selectBinary} from "../actions/ui/binary-viewer-action"
import {SharedAppState} from "../state"
import {BinaryViewerState} from "../state/ui"

export interface UseBinaryViewerHook {
  readonly binaries: Binary[]
  readonly selectedBinaryId: Option<UUID>
  readonly selectBinaryId: (id: UUID) => void
  readonly closeBinary: (id: UUID) => void
}

export const useBinaryViewer = <TState>(
  binaryViewerKey: keyof BinaryViewerState,
  getState: (state: TState) => SharedAppState
): UseBinaryViewerHook => {
  const dispatch = useDispatch()
  const binaries = useSelector<TState, Binary[]>(s => getState(s).ui.binaryViewer[binaryViewerKey].openBinaries)
  const selectedBinaryId = useSelector<TState, Option<UUID>>(
    s => getState(s).ui.binaryViewer[binaryViewerKey].selectedBinaryId
  )

  const handleSelect = (id: UUID) => dispatch(selectBinary(id, binaryViewerKey))
  const handleClose = (id: UUID) => dispatch(closeBinary(id, binaryViewerKey))

  return {
    binaries,
    selectedBinaryId,
    selectBinaryId: handleSelect,
    closeBinary: handleClose
  }
}
