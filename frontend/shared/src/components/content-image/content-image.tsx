import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {backgroundColorDarker, Children, CustomStyle, spacing, spacingSmall} from "../../styles"

interface ContentImageProps extends CustomStyle, Children {
  readonly imageUrl: string
  readonly onClick?: () => void
  readonly scrollId?: string
  readonly wrapperStyle?: CSSInterpolation
}

export const ContentImage: React.FC<ContentImageProps> = ({
  children,
  customStyles,
  imageUrl,
  onClick,
  scrollId,
  wrapperStyle
}) => {
  return (
    <div css={[styles.wrapper, wrapperStyle]} onClick={onClick} {...{...(scrollId && {"data-scroll": scrollId})}}>
      <div className="image" css={[styles.image(imageUrl, !!onClick), customStyles]} />
      {children}
    </div>
  )
}
const Size = {
  image: "15vh",
  minImage: 150
}

const styles = {
  wrapper: css({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: Size.image,
    minHeight: Size.minImage,
    margin: spacing(0, spacingSmall, spacingSmall, 0)
  }),
  image: (src: string, clickable: boolean) =>
    css({
      cursor: clickable ? "pointer" : "default",
      width: "100%",
      height: "100%",
      backgroundImage: `url(${src})`,
      backgroundColor: backgroundColorDarker,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain"
    })
}
