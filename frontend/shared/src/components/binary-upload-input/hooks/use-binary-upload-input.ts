import {isEqual} from "lodash-es"
import * as React from "react"
import {ViewerToolsType} from "../../../enums"
import {BinaryFile} from "../../../models"
import {getViewerToolForMimeType, Option} from "../../../utils"

export interface UseBinaryUploadInputHook {
  readonly isUploadModalVisible: boolean
  readonly showUploadModal: () => void
  readonly hideUploadModal: () => void
  readonly binary: Option<BinaryFile>
  readonly updateBinary: (binaryFile: BinaryFile) => void
  readonly resetBinary: () => void
  readonly viewerTool: Option<ViewerToolsType>
  readonly isBinaryViewerVisible: boolean
  readonly showBinaryViewer: () => void
  readonly hideBinaryViewer: () => void
}

interface UseBinaryUploadInputParams {
  readonly defaultBinaryFile?: BinaryFile
  readonly onOpenBinary?: (binaryFileId: UUID) => void
  readonly onCloseBinary?: (binaryFileId: UUID) => void
}

export const useBinaryUploadInput = ({
  defaultBinaryFile,
  onOpenBinary,
  onCloseBinary
}: UseBinaryUploadInputParams): UseBinaryUploadInputHook => {
  const [binary, setBinary] = React.useState<Option<BinaryFile>>(Option.of(defaultBinaryFile))
  const [isUploadModalVisible, setIsUploadModalVisible] = React.useState<boolean>(false)
  const [isBinaryViewerVisible, setIsBinaryViewerVisible] = React.useState<boolean>(false)

  const viewerTool = binary.map(({mimeType}) => getViewerToolForMimeType(mimeType))

  const showUploadModal = () => setIsUploadModalVisible(true)
  const hideUploadModal = () => setIsUploadModalVisible(false)

  const updateBinary = (binaryFile: BinaryFile) => setBinary(Option.of(binaryFile))
  const resetBinary = () => setBinary(Option.none())

  const showBinaryViewer = () => {
    binary.forEach(({id}) => onOpenBinary?.(id))
    setIsBinaryViewerVisible(true)
  }
  const hideBinaryViewer = () => {
    binary.forEach(({id}) => onCloseBinary?.(id))
    setIsBinaryViewerVisible(false)
  }

  React.useEffect(() => {
    if (isEqual(binary.orUndefined(), defaultBinaryFile)) {
      return
    }

    if (!defaultBinaryFile) {
      resetBinary()
      return
    }
    updateBinary(defaultBinaryFile)
  }, [defaultBinaryFile])

  return {
    isUploadModalVisible,
    showUploadModal,
    hideUploadModal,
    binary,
    updateBinary,
    resetBinary,
    viewerTool,
    isBinaryViewerVisible,
    showBinaryViewer,
    hideBinaryViewer
  }
}
