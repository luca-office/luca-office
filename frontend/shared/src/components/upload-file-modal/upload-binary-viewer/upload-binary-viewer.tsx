import {css} from "@emotion/react"
import * as React from "react"
import {BinaryType} from "../../../enums"
import {Binary} from "../../../models"
import {Option} from "../../../utils"
import {BinaryViewer} from "../../binary-viewer"

export interface UploadBinaryViewerProps {
  readonly type: BinaryType
  readonly onClose: () => void
  readonly binaries: Binary[]
  readonly activeBinaryId: Option<UUID>
  readonly setActiveBinaryId: (binaryId: UUID) => void
}

export const UploadBinaryViewer: React.FC<UploadBinaryViewerProps> = ({
  type,
  onClose,
  binaries,
  activeBinaryId,
  setActiveBinaryId
}) => (
  <BinaryViewer
    customStyles={styles.binaryViewer}
    type={type}
    binaries={binaries}
    onCloseViewer={onClose}
    activeBinaryId={activeBinaryId.orUndefined()}
    setActiveBinaryId={setActiveBinaryId}
  />
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
