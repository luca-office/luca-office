import {css} from "@emotion/react"
import React from "react"
import {BinaryViewer, Overlay} from "shared/components"
import {BinaryType} from "shared/enums"
import {Binary} from "shared/models"
import {AutomatedCriterionReferenceBooksConfig, ReferenceBookTool, ReferenceBookToolProps} from "shared/office-tools"
import {CustomStyle} from "shared/styles"
import {Option} from "shared/utils"
import {useReferenceBookPreview} from "./hooks/use-reference-book-preview"

interface Props extends CustomStyle {
  readonly scenarioId: UUID
  readonly isBundled: boolean
  readonly onClose: () => void
  readonly automatedCriterionConfig?: AutomatedCriterionReferenceBooksConfig
}

export interface SelectedBinary extends Binary {
  type: BinaryType
}

export const ReferenceBookPreview: React.FC<Props> = ({
  scenarioId,
  onClose,
  automatedCriterionConfig,
  isBundled,
  customStyles
}) => {
  const [selectedBinary, setSelectedBinary] = React.useState<Option<SelectedBinary>>(Option.none)

  const openBinary = (id: UUID, url: string, title: string | undefined, type: BinaryType) =>
    setSelectedBinary(
      Option.of<SelectedBinary>({
        id,
        path: url,
        type,
        title
      })
    )

  const referenceBookToolProps: ReferenceBookToolProps = {
    onClose,
    ...useReferenceBookPreview(scenarioId),
    hideChapters: isBundled,
    openImage: (id, url, title) => openBinary(id, url, title, BinaryType.Image),
    openVideo: (id, url, title) => openBinary(id, url, title, BinaryType.Video),
    openPdf: (id, url, title) => openBinary(id, url, title, BinaryType.PDF),
    customStyles,
    automatedCriterionConfig
  }

  return (
    <React.Fragment>
      <ReferenceBookTool {...referenceBookToolProps} />
      {selectedBinary
        .map(binary => (
          <Overlay>
            <BinaryViewer
              customStyles={styles.binaryViewer}
              binaries={[{id: binary.id, title: binary.title, path: binary.path}]}
              onCloseViewer={() => setSelectedBinary(Option.none)}
              type={binary.type}
            />
          </Overlay>
        ))
        .orNull()}
    </React.Fragment>
  )
}

const styles = {
  binaryViewer: css({
    height: "80vh",
    width: "80vh"
  })
}
