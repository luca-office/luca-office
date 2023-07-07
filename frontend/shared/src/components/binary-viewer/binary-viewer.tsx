import {css} from "@emotion/react"
import * as React from "react"
import {BinaryType, ViewerToolsType} from "../../enums"
import {Binary, VideoConfig} from "../../models"
import {backgroundColorDarker, CustomStyle, Flex, zIndex1} from "../../styles"
import {Option} from "../../utils"
import {PdfView} from ".."
import {ToolsHeader, ViewerToolsSubHeader} from "../viewer-tools"
import {ImageView} from "./image-view"
import {VideoView} from "./video-view"

export interface BinaryViewerProps extends CustomStyle {
  readonly activeBinaryId?: UUID
  readonly binaries: Binary[]
  readonly onCloseBinary?: (id: UUID) => void
  readonly onCloseViewer: () => void
  readonly onMinimize?: () => void
  readonly setActiveBinaryId?: (id: UUID) => void
  readonly type: BinaryType
  readonly videoConfig?: VideoConfig
}

export const BinaryViewer: React.FC<BinaryViewerProps> = ({
  activeBinaryId,
  binaries,
  customStyles,
  onCloseBinary,
  onCloseViewer,
  onMinimize,
  setActiveBinaryId,
  type,
  videoConfig
}) => {
  const areControlsDisabled = binaries.length <= 1 || !setActiveBinaryId
  const selectedBinary = activeBinaryId
    ? Option.of<Binary>(binaries.find(binary => binary.id === activeBinaryId))
    : Option.of(binaries[binaries.length - 1])
  const selectedIndex = selectedBinary.map(binary => binaries.indexOf(binary)).getOrElse(binaries.length - 1)

  const onLeftClick = () => {
    if (setActiveBinaryId && binaries.length) {
      if (selectedIndex === 0) {
        setActiveBinaryId(binaries[binaries.length - 1].id)
      } else {
        setActiveBinaryId(binaries[selectedIndex - 1].id)
      }
    }
  }

  const onRightClick = () => {
    if (setActiveBinaryId && binaries.length) {
      if (selectedIndex === binaries.length - 1) {
        setActiveBinaryId(binaries[0].id)
      } else {
        setActiveBinaryId(binaries[selectedIndex + 1].id)
      }
    }
  }

  const renderBinaryView = (binary: Binary) => {
    switch (type) {
      case BinaryType.Image:
        return <ImageView url={binary.path} customStyles={styles.binary} />
      case BinaryType.Video:
        return (
          <VideoView
            url={binary.path}
            customStyles={styles.binary}
            onPlay={videoConfig?.onPlay}
            onPause={videoConfig?.onPause}
          />
        )
      case BinaryType.PDF:
        return <PdfView binaryUrl={binary.path} customStyles={styles.pdfView} />
      default:
        return null
    }
  }

  return selectedBinary
    .map(binary => (
      <div css={[styles.viewer, customStyles]}>
        <ToolsHeader toolType={getToolTypeByBinaryType(type)} onClose={onCloseViewer} onMinimizeTool={onMinimize} />
        <ViewerToolsSubHeader
          customStyles={styles.subHeader}
          elements={Option.of(binaries)}
          selectedElement={selectedBinary}
          closeElement={onCloseBinary}
          selectElement={setActiveBinaryId}
          navigateToPrevious={areControlsDisabled ? undefined : onLeftClick}
          navigateToNext={areControlsDisabled ? undefined : onRightClick}
        />
        {renderBinaryView(binary)}
      </div>
    ))
    .orNull()
}

const styles = {
  viewer: css(Flex.column),
  subHeader: css({
    zIndex: zIndex1
  }),
  binary: css({
    flex: 1
  }),
  pdfView: css({
    backgroundColor: backgroundColorDarker,
    overflow: "auto"
  })
}

const getToolTypeByBinaryType = (binaryType: BinaryType): ViewerToolsType => {
  switch (binaryType) {
    case BinaryType.Image:
      return ViewerToolsType.Image
    case BinaryType.Video:
      return ViewerToolsType.Video
    case BinaryType.PDF:
      return ViewerToolsType.PDF
    default:
      return ViewerToolsType.File
  }
}
