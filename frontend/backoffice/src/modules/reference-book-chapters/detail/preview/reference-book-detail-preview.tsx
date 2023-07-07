import {css} from "@emotion/react"
import React from "react"
import {BinaryViewer, Overlay} from "shared/components"
import {BinaryType} from "shared/enums"
import {ReferenceBookTool, ReferenceBookToolProps} from "shared/office-tools/reference-book"
import {Option} from "shared/utils"
import {SelectedBinary} from "../../scenario/preview/reference-book-preview"
import {useReferenceBookDetailPreview} from "./hooks/use-reference-book-detail-preview"

export interface ReferenceBookDetailPreviewProps {
  readonly referenceBookChapterId: UUID
  readonly onClose: () => void
}

export const ReferenceBookDetailPreview: React.FC<ReferenceBookDetailPreviewProps> = ({
  referenceBookChapterId,
  onClose
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
    ...useReferenceBookDetailPreview(referenceBookChapterId),
    hideChapters: false,
    openImage: (id, url, title) => openBinary(id, url, title, BinaryType.Image),
    openVideo: (id, url, title) => openBinary(id, url, title, BinaryType.Video),
    openPdf: (id, url, title) => openBinary(id, url, title, BinaryType.PDF)
  }

  return (
    <React.Fragment>
      <ReferenceBookTool {...referenceBookToolProps} customStyles={styles.referenceBook} />
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
  referenceBook: css({
    width: "90vw",
    height: "90vh"
  }),
  binaryViewer: css({height: "80vh", width: "80vh"})
}
