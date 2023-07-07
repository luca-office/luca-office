import * as React from "react"
import {ImageViewer} from "../../components"
import {Binary} from "../../models"
import {UseBinaryViewerHook} from "../../redux/hooks"
import {CustomStyle} from "../../styles"

export interface ImageViewerSurveyEvents {
  readonly sendCloseBinaryEvent: (binaryId: UUID) => void
  readonly sendSelectImageEvent: (binary: Binary) => void
}

interface ImageViewerContainerProps extends CustomStyle {
  readonly onClose: () => void
  readonly onMinimize?: () => void
  readonly useState: () => UseBinaryViewerHook
  readonly useSurveyEvents: () => ImageViewerSurveyEvents
}

export const ImageViewerContainer: React.FC<ImageViewerContainerProps> = ({
  customStyles,
  onClose,
  onMinimize,
  useState,
  useSurveyEvents
}) => {
  const {closeBinary: onCloseBinary, binaries, selectBinaryId, selectedBinaryId} = useState()

  const {sendCloseBinaryEvent, sendSelectImageEvent} = useSurveyEvents()

  React.useEffect(() => {
    selectedBinaryId.forEach(id => {
      const binary = binaries.find(b => b.id === id)

      if (binary !== undefined) {
        sendSelectImageEvent(binary)
      }
    })
  }, [selectedBinaryId.orNull()])

  const closeBinary = (binaryId: UUID) => {
    onCloseBinary(binaryId)
    sendCloseBinaryEvent(binaryId)
  }

  const handleClose = () => {
    binaries.forEach(binary => sendCloseBinaryEvent(binary.id))
    onClose()
  }

  return (
    <ImageViewer
      customStyles={customStyles}
      onClose={handleClose}
      binaries={binaries}
      onCloseImage={closeBinary}
      onMinimize={onMinimize}
      activeImageId={selectedBinaryId.orUndefined()}
      setActiveImageId={selectBinaryId}
    />
  )
}
