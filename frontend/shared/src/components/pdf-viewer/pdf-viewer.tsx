import * as React from "react"
import {ViewerToolsType} from "../../enums"
import {Binary} from "../../models"
import {CustomStyle} from "../../styles"
import {Option} from "../../utils"
import {ToolsHeader, ViewerToolsSubHeader} from "../viewer-tools"
import {usePdfViewer} from "./hooks/use-pdf-viewer"
import {PdfView} from "./pdf-view"
import {pdfViewerStyle as styles} from "./pdf-viewer.style"

export interface PdfViewerProps extends CustomStyle {
  readonly binaries: Binary[]
  readonly closeBinary?: (id: UUID) => void
  readonly onClose: () => void
  readonly onMinimize?: () => void
  readonly selectedBinaryId: Option<UUID>
  readonly selectBinaryId?: (id: UUID) => void
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
  onClose,
  onMinimize,
  customStyles,
  binaries,
  closeBinary,
  selectBinaryId,
  selectedBinaryId
}) => {
  const {areControlsDisabled, selectedPdf, onLeftClick, onRightClick, selectPdf} = usePdfViewer(
    binaries,
    selectedBinaryId,
    selectBinaryId,
    closeBinary
  )

  return (
    <div css={[styles.viewer, customStyles]}>
      <ToolsHeader toolType={ViewerToolsType.PDF} onClose={onClose} onMinimizeTool={onMinimize} />
      <ViewerToolsSubHeader
        elements={Option.of(binaries)}
        customStyles={styles.subHeader}
        closeElement={closeBinary}
        selectedElement={selectedPdf}
        selectElement={selectPdf}
        hideNavigationButtons={areControlsDisabled}
        {...{
          ...(!areControlsDisabled && {
            navigateToPrevious: onLeftClick,
            navigateToNext: onRightClick
          })
        }}
      />
      <div css={styles.pdfContent}>
        <PdfView binaryUrl={selectedPdf.map(pdf => pdf.path).getOrElse("")} />
      </div>
      <div css={styles.footerWrapper} />
    </div>
  )
}
