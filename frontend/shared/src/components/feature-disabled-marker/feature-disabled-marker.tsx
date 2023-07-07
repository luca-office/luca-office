import {css} from "@emotion/react"
import * as React from "react"
import {borderRadiusSmall, Children, CustomStyle, infoColor, spacingTiny} from "../../styles"

export const FeatureDisabledMarker: React.FC<CustomStyle & Children> = ({customStyles, children}) => {
  return (
    <div className="feature-disabled-marker" css={[styles.container, customStyles]}>
      {children}
      <div css={styles.disabledOverlay} />
    </div>
  )
}

const styles = {
  container: css({
    position: "relative"
  }),
  disabledOverlay: css({
    cursor: "not-allowed",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: infoColor,
    opacity: 0.16,
    top: -spacingTiny,
    left: -spacingTiny,
    padding: spacingTiny,
    borderRadius: borderRadiusSmall
  })
}
