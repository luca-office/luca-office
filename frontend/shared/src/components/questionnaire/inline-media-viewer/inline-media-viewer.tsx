import {css} from "@emotion/react"
import React from "react"
import {ButtonVariant, IconName, ViewerToolsType} from "../../../enums"
import {BinaryFile} from "../../../models"
import {backgroundColor, borderRadius, CustomStyle, iconBrightColor, spacingSmall, zIndex1} from "../../../styles"
import {getViewerToolForMimeType} from "../../../utils/file-utils"
import {VideoView} from "../../binary-viewer"
import {Button} from "../../button/button"

export interface InlineMediaViewerProps extends CustomStyle {
  readonly binaryFile: BinaryFile
  readonly onZoomClicked: () => void
  readonly isZoomed: boolean
  readonly onVideoPlaybackEnded?: () => void
  readonly onVideoPlaybackStarted?: () => void
  readonly onVideoPlaybackPaused?: () => void
  readonly onVideoFullscreenEntered?: () => void
  readonly onVideoFullscreenLeft?: () => void
}

export const InlineMediaViewer: React.FC<InlineMediaViewerProps> = ({
  binaryFile,
  onZoomClicked,
  isZoomed,
  onVideoPlaybackStarted,
  onVideoPlaybackEnded,
  onVideoPlaybackPaused,
  onVideoFullscreenEntered,
  onVideoFullscreenLeft,
  customStyles
}) => {
  const viewerToolType = getViewerToolForMimeType(binaryFile.mimeType)
  return (
    <div css={[styles.container(isZoomed), customStyles]}>
      <Button
        customStyles={styles.zoomButton}
        variant={ButtonVariant.IconOnly}
        icon={isZoomed ? IconName.ZoomOut : IconName.ZoomIn}
        iconColor={iconBrightColor}
        onClick={onZoomClicked}
      />
      {viewerToolType === ViewerToolsType.Image ? (
        <img src={binaryFile.url} css={styles.media(isZoomed)} />
      ) : viewerToolType === ViewerToolsType.Video ? (
        <VideoView
          url={binaryFile.url}
          customStyles={styles.media(isZoomed)}
          onPlay={onVideoPlaybackStarted}
          onEnded={onVideoPlaybackEnded}
          onPause={onVideoPlaybackPaused}
          onFullscreenEntered={onVideoFullscreenEntered}
          onFullscreenLeft={onVideoFullscreenLeft}
        />
      ) : null}
    </div>
  )
}

const styles = {
  container: (isZoomed: boolean) =>
    css({
      display: "flex",
      position: "relative",
      borderRadius: isZoomed ? borderRadius : 0,
      justifyContent: "center",
      backgroundColor: backgroundColor,
      minWidth: 300
    }),
  zoomButton: css({
    position: "absolute",
    top: spacingSmall,
    right: spacingSmall,
    zIndex: zIndex1
  }),
  media: (isZoomed: boolean) => css({maxHeight: isZoomed ? 1000 : 200, maxWidth: isZoomed ? "100%" : 300})
}
