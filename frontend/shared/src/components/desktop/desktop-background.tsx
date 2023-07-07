import {css} from "@emotion/react"
import * as React from "react"
import {Children, CustomStyle, fontColorBright} from "../../styles"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const backgroundLogo = require("../../assets/images/luca-background-Logo.svg")

export const DesktopBackground: React.FC<CustomStyle & Children> = ({customStyles, children}) => {
  return (
    <div css={[styles.background, customStyles]}>
      <div
        className={"background-logo"}
        css={styles.backgroundLogo}
        dangerouslySetInnerHTML={{__html: backgroundLogo}}
      />
      {children}
    </div>
  )
}

const Size = {
  backgroundIcon: {width: 134, height: 152}
}

const styles = {
  background: css({
    position: "relative",
    background: "radial-gradient(ellipse 100% 100% at 50% 100%, rgb(222, 235, 255) 0%, rgb(185, 212, 255) 100%)",
    overflow: "hidden"
  }),
  backgroundLogo: css({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
    width: Size.backgroundIcon.width,
    height: Size.backgroundIcon.height,
    color: fontColorBright
  })
}
