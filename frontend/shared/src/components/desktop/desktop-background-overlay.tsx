import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {Children, CustomStyle, zIndex1} from "../../styles"
import {DesktopBackground} from "./desktop-background"

export interface DesktopBackgroundOverlayProps extends CustomStyle, Children {
  readonly customContentStyles?: CSSInterpolation
  readonly customBackgroundStyles?: CSSInterpolation
  readonly className?: string
}

export const DesktopBackgroundOverlay: React.FC<DesktopBackgroundOverlayProps> = ({
  customStyles,
  customContentStyles,
  customBackgroundStyles,
  className,
  children
}) => {
  return (
    <div css={[styles.content, customStyles]} className={className}>
      <div css={[styles.contentWrapper, customContentStyles]}>{children}</div>
      <DesktopBackground customStyles={[styles.desktopBackground, customBackgroundStyles]} />
    </div>
  )
}

const styles = {
  content: css({
    position: "relative",
    display: "grid",
    gridTemplateColumns: "1fr"
  }),
  contentWrapper: css({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: zIndex1
  }),
  desktopBackground: css({
    opacity: 0.4
  })
}
