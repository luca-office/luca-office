import {css} from "@emotion/react"
import * as React from "react"
import {Children, CustomStyle, headerBoxShadow, headerHeight, spacing, spacingHeader, spacingSmall} from "../../styles"

export const SubHeader: React.FC<CustomStyle & Children> = ({customStyles, children}) => (
  <div css={[styles.container, customStyles]}>{children}</div>
)

const styles = {
  container: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: headerHeight,
    padding: spacing(spacingSmall, spacingHeader),
    backgroundColor: "white",
    boxShadow: headerBoxShadow
  })
}
