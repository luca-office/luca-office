import {css} from "@emotion/react"
import React, {useEffect} from "react"
import {VideoConfig} from "../../models"
import {backgroundColorDarker, CustomStyle, Flex} from "../../styles"

interface Props extends CustomStyle, VideoConfig {
  readonly url: string
}

export const VideoView: React.FC<Props> = ({
  customStyles,
  url,
  onPlay,
  onPause,
  onEnded,
  onFullscreenEntered,
  onFullscreenLeft
}) => {
  useEffect(() => {
    const onFullscreenChange = () => {
      if (document.fullscreenElement !== null) {
        onFullscreenEntered?.()
      } else {
        onFullscreenLeft?.()
      }
    }

    document.addEventListener("mozfullscreenchange", onFullscreenChange)
    document.addEventListener("webkitfullscreenchange", onFullscreenChange)
    document.addEventListener("fullscreenchange", onFullscreenChange)

    return () => {
      document.removeEventListener("mozfullscreenchange", onFullscreenChange, false)
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange, false)
      document.removeEventListener("fullscreenchange", onFullscreenChange, false)
    }
  }, [])

  return (
    <div css={[customStyles, styles.videoWrapper]} className="video">
      <video
        css={styles.video}
        src={url}
        role="video"
        controls={true}
        controlsList="nodownload"
        disablePictureInPicture={true}
        onPlay={() => onPlay?.()}
        onPause={() => onPause?.()}
        onEnded={() => onEnded?.()}
      />
    </div>
  )
}

const styles = {
  videoWrapper: css(Flex.column, {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColorDarker,
    minHeight: 0
  }),
  video: css({
    maxWidth: "100%",
    maxHeight: "100%",

    "&:focus": {
      outline: "none"
    }
  })
}
