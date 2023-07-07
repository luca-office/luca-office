import {css} from "@emotion/react"
import React, {useState} from "react"
import {BinaryFile} from "../../../models"
import {
  CustomStyle,
  Flex,
  flex1,
  fontFamily,
  spacingHuger,
  spacingLarge,
  spacingMedium,
  TextSize
} from "../../../styles"
import {Text} from "../../typography/typography"
import {InlineMediaViewer} from "../inline-media-viewer/inline-media-viewer"

export interface QuestionnaireIntroductionProps extends CustomStyle {
  readonly title: string
  readonly description: string
  readonly binaryFile?: BinaryFile
  readonly onImageShrunk?: () => void
  readonly onImageEnlarged?: () => void
  readonly onVideoPlaybackStarted?: () => void
  readonly onVideoPlaybackPaused?: () => void
  readonly onVideoPlaybackEnded?: () => void
  readonly onVideoFullscreenEntered?: () => void
  readonly onVideoFullscreenLeft?: () => void
}

export const QuestionnaireIntroduction: React.FC<QuestionnaireIntroductionProps> = ({
  title,
  description,
  binaryFile,
  onImageEnlarged,
  onImageShrunk,
  onVideoPlaybackStarted,
  onVideoPlaybackPaused,
  onVideoPlaybackEnded,
  onVideoFullscreenEntered,
  onVideoFullscreenLeft,
  customStyles
}) => {
  const [isMediaZoomed, setIsMediaZoomed] = useState(false)

  const onZoomClicked = () => {
    setIsMediaZoomed(!isMediaZoomed)

    if (isMediaZoomed) {
      onImageShrunk?.()
    } else {
      onImageEnlarged?.()
    }
  }

  return (
    <div css={[customStyles]}>
      <div css={styles.heading}>{title}</div>
      <div css={styles.description(isMediaZoomed)}>
        <Text css={styles.text} size={TextSize.Medium}>
          {description}
        </Text>
        {binaryFile && (
          <InlineMediaViewer
            customStyles={styles.inlineMediaViewer(isMediaZoomed)}
            binaryFile={binaryFile}
            isZoomed={isMediaZoomed}
            onZoomClicked={onZoomClicked}
            onVideoPlaybackStarted={onVideoPlaybackStarted}
            onVideoPlaybackPaused={onVideoPlaybackPaused}
            onVideoPlaybackEnded={onVideoPlaybackEnded}
            onVideoFullscreenEntered={onVideoFullscreenEntered}
            onVideoFullscreenLeft={onVideoFullscreenLeft}
          />
        )}
      </div>
    </div>
  )
}

const styles = {
  heading: css({
    fontSize: TextSize.Larger,
    fontFamily: fontFamily,
    marginBottom: spacingMedium
  }),
  description: (isZoomed: boolean) =>
    css(isZoomed ? Flex.column : Flex.row, {
      marginBottom: spacingHuger
    }),
  text: css({
    alignSelf: "start",
    flex: flex1,
    whiteSpace: "pre-line"
  }),
  inlineMediaViewer: (isZoomed: boolean) =>
    css({
      minWidth: 300,
      marginLeft: isZoomed ? 0 : spacingLarge,
      marginTop: isZoomed ? spacingLarge : 0
    })
}
