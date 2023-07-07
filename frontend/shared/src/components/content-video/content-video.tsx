import {css} from "@emotion/react"
import * as React from "react"
import {backgroundColorDarker, Children, CustomStyle, Flex, spacing, spacingSmall} from "../../styles"

export interface ContentVideoProps extends CustomStyle, Children {
  readonly onClick?: () => void
  readonly scrollId?: string
  readonly showControls?: boolean
  readonly videoUrl: string
}

export const ContentVideo: React.FC<ContentVideoProps> = ({
  customStyles,
  onClick,
  scrollId,
  videoUrl,
  children,
  showControls = false
}) => {
  return (
    <div
      css={[styles.container(!!onClick), customStyles]}
      data-scroll={scrollId}
      role="button"
      onClick={() => onClick?.()}>
      <div css={styles.videoWrapper}>
        <video css={styles.video} src={videoUrl} controls={showControls} />
        {children}
      </div>
    </div>
  )
}

const Size = {
  video: 144
}

const styles = {
  container: (isSelectable: boolean) =>
    css({
      position: "relative",
      display: "inline-block",
      width: Size.video,
      height: Size.video,
      margin: spacing(0, spacingSmall, spacingSmall, 0),
      backgroundColor: backgroundColorDarker,
      overflow: "hidden",
      cursor: isSelectable ? "pointer" : "initial"
    }),
  videoWrapper: css(Flex.row, {
    justifyContent: "center",
    width: "100%",
    height: "100%"
  }),
  video: css({
    maxWidth: "100%",
    maxHeight: "100%"
  })
}
