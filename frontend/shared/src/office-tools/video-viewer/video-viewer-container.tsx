import * as React from "react"
import {VideoViewer} from "../../components"
import {Binary} from "../../models"
import {UseBinaryViewerHook} from "../../redux/hooks"
import {CustomStyle} from "../../styles"

export interface VideoViewerContainerSurveyEvents {
  readonly sendPlayVideoEvent: (fileId: UUID) => void
  readonly sendPauseVideoEvent: (fileId: UUID) => void
  readonly sendCloseBinaryEvent: (binaryId: UUID) => void
  readonly sendSelectVideoEvent: (binary: Binary) => void
}

interface VideoViewerContainerProps extends CustomStyle {
  readonly onClose: () => void
  readonly onMinimize?: () => void
  readonly useState: () => UseBinaryViewerHook
  readonly useSurveyEvents: () => VideoViewerContainerSurveyEvents
}

export const VideoViewerContainer: React.FC<VideoViewerContainerProps> = ({
  customStyles,
  onClose,
  onMinimize,
  useState,
  useSurveyEvents
}) => {
  const {closeBinary, binaries, selectBinaryId, selectedBinaryId} = useState()
  const {sendPlayVideoEvent, sendPauseVideoEvent, sendCloseBinaryEvent, sendSelectVideoEvent} = useSurveyEvents()

  React.useEffect(() => {
    selectedBinaryId.forEach(id => {
      const binary = binaries.find(b => b.id === id)

      if (binary !== undefined) {
        sendSelectVideoEvent(binary)
      }
    })
  }, [selectedBinaryId.orNull()])

  const onPlay = () => selectedBinaryId.forEach(sendPlayVideoEvent)
  const onPause = () => selectedBinaryId.forEach(sendPauseVideoEvent)

  const onCloseBinary = (id: UUID) => {
    sendCloseBinaryEvent(id)
    closeBinary(id)
  }

  const handleClose = () => {
    binaries.forEach(binary => sendCloseBinaryEvent(binary.id))
    onClose()
  }

  return (
    <VideoViewer
      customStyles={customStyles}
      onClose={handleClose}
      binaries={binaries}
      onCloseVideo={onCloseBinary}
      onMinimize={onMinimize}
      activeVideoId={selectedBinaryId.orUndefined()}
      setActiveVideoId={selectBinaryId}
      config={{onPlay, onPause}}
    />
  )
}
