import * as React from "react"
import {BinaryType} from "../../enums"
import {Binary, VideoConfig} from "../../models"
import {CustomStyle} from "../../styles"
import {BinaryViewer} from "../binary-viewer"

export interface VideoViewerProps extends CustomStyle {
  readonly activeVideoId?: UUID
  readonly binaries: Binary[]
  readonly config?: VideoConfig
  readonly onClose: () => void
  readonly onCloseVideo?: (id: UUID) => void
  readonly onMinimize?: () => void
  readonly setActiveVideoId?: (id: UUID) => void
}

export const VideoViewer: React.FC<VideoViewerProps> = ({
  activeVideoId,
  binaries,
  config,
  customStyles,
  onClose,
  onCloseVideo,
  onMinimize,
  setActiveVideoId
}) => (
  <BinaryViewer
    customStyles={customStyles}
    type={BinaryType.Video}
    binaries={binaries}
    onCloseViewer={onClose}
    onCloseBinary={onCloseVideo}
    onMinimize={onMinimize}
    activeBinaryId={activeVideoId}
    setActiveBinaryId={setActiveVideoId}
    videoConfig={config}
  />
)
