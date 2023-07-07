import {css} from "@emotion/react"
import * as React from "react"
import {boxHeightLarge, Children, CustomStyle, Flex, spacing, spacingHeader, spacingTiny} from "../../../styles"

export const ContentBottomActionbar: React.FC<CustomStyle & Children> = ({children, customStyles}) => {
  const styles = customStyles ? [style, customStyles] : style
  return (
    <div className="bottom-action-bar" css={styles}>
      {children}
    </div>
  )
}

const style = css(Flex.row, {
  justifySelf: "flex-end",
  marginTop: "auto",
  padding: spacing(spacingTiny, spacingHeader),
  height: boxHeightLarge,
  boxSizing: "border-box",
  background: "white",
  boxShadow: "0px -2px 4px 0px rgba(0, 0, 0, 0.16)",
  display: "flex",
  alignItems: "center"
})
