import {css} from "@emotion/react"
import * as React from "react"
import {borderRadius, Children, CustomStyle, Flex, flex1, radius, zIndex1} from "../../../styles"

export interface CardContentProps extends CustomStyle, Children {
  readonly disabled?: boolean
}

export const CardContent: React.FC<CardContentProps> = ({disabled = false, customStyles, children}) => (
  <div css={[styles.cardContent, customStyles]} className={"card-content"}>
    {disabled && <div css={styles.disableOverlay} />}
    {children}
  </div>
)

const styles = {
  cardContent: css(Flex.column, {
    justifyContent: "space-between",
    flex: flex1,
    width: "100%",
    position: "relative"
  }),
  disableOverlay: css({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: radius(0, 0, borderRadius, borderRadius),
    zIndex: zIndex1,
    backgroundColor: "rgba(255,255,255,0.6)"
  })
}
