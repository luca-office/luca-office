import * as React from "react"
import {BinaryType} from "../../enums"
import {Binary} from "../../models"
import {CustomStyle} from "../../styles"
import {BinaryViewer} from "../binary-viewer"

export interface ImageViewerProps extends CustomStyle {
  readonly binaries: Binary[]
  readonly onClose: () => void
  readonly activeImageId?: UUID
  readonly onCloseImage?: (id: UUID) => void
  readonly onMinimize?: () => void
  readonly setActiveImageId?: (id: UUID) => void
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  binaries,
  onClose,
  customStyles,
  onCloseImage,
  onMinimize,
  activeImageId,
  setActiveImageId
}) => (
  <BinaryViewer
    customStyles={customStyles}
    type={BinaryType.Image}
    binaries={binaries}
    onCloseViewer={onClose}
    onCloseBinary={onCloseImage}
    onMinimize={onMinimize}
    activeBinaryId={activeImageId}
    setActiveBinaryId={setActiveImageId}
  />
)
