import {css} from "@emotion/react"
import * as React from "react"
import {ImageViewer, Overlay, VideoViewer} from "shared/components"
import {BinaryType} from "shared/enums"
import {Binary} from "shared/models"
import {Option} from "shared/utils"

export interface ResortModalBinaryViewerProps {
  readonly activeBinaryId: Option<UUID>
  readonly binaries: Binary[]
  readonly onClose: () => void
  readonly setActiveBinaryId: (id: UUID) => void
  readonly type: BinaryType.Image | BinaryType.Video
}

export const ResortModalBinaryViewer: React.FC<ResortModalBinaryViewerProps> = ({
  activeBinaryId,
  binaries,
  onClose,
  setActiveBinaryId,
  type
}) => (
  <Overlay>
    {type === BinaryType.Image ? (
      <ImageViewer
        customStyles={styles.binaryViewer}
        binaries={binaries}
        onClose={onClose}
        activeImageId={activeBinaryId.orUndefined()}
        setActiveImageId={setActiveBinaryId}
      />
    ) : (
      <VideoViewer
        customStyles={styles.binaryViewer}
        binaries={binaries}
        onClose={onClose}
        activeVideoId={activeBinaryId.orUndefined()}
        setActiveVideoId={setActiveBinaryId}
      />
    )}
  </Overlay>
)

const Size = {
  binaryViewer: {height: "80vh", width: "80vw"}
}

const styles = {
  binaryViewer: css({
    width: Size.binaryViewer.width,
    height: Size.binaryViewer.height
  })
}
