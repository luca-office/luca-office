import {Binary} from "../../../models"
import {Option} from "../../../utils"

export interface UsePdfViewerHook {
  readonly areControlsDisabled: boolean
  readonly binaries: Binary[]
  readonly onLeftClick: () => void
  readonly onRightClick: () => void
  readonly selectedPdf: Option<Binary>
  readonly selectPdf: (id: UUID) => void
  readonly closeBinary?: (id: UUID) => void
}

export const usePdfViewer = (
  binaries: Binary[],
  selectedBinaryId: Option<UUID>,
  selectBinaryId?: (id: UUID) => void,
  closeBinary?: (id: UUID) => void
): UsePdfViewerHook => {
  const areControlsDisabled = binaries.length <= 1 || !selectBinaryId
  const selectedBinary: Option<Binary> = selectedBinaryId.map((binaryId: UUID) =>
    binaries.some(binary => binary.id === binaryId)
      ? (binaries.find(binary => binary.id === binaryId) as Binary)
      : binaries[binaries.length - 1]
  )
  const selectedIndex = selectedBinary.map(binary => binaries.indexOf(binary)).getOrElse(binaries.length - 1)

  const onLeftClick = () => {
    if (selectBinaryId && binaries.length) {
      if (selectedIndex === 0) {
        selectBinaryId(binaries[binaries.length - 1].id)
      } else {
        selectBinaryId(binaries[selectedIndex - 1].id)
      }
    }
  }
  const onRightClick = () => {
    if (selectBinaryId && binaries.length) {
      if (selectedIndex === binaries.length - 1) {
        selectBinaryId(binaries[0].id)
      } else {
        selectBinaryId(binaries[selectedIndex + 1].id)
      }
    }
  }

  const onSelect = (id: UUID) => {
    if (selectBinaryId) {
      selectBinaryId(id)
    }
  }

  return {
    areControlsDisabled,
    binaries,
    closeBinary,
    onLeftClick,
    onRightClick,
    selectedPdf: selectedBinary,
    selectPdf: onSelect
  }
}
