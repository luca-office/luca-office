import {css} from "@emotion/react"
import * as React from "react"
import {cardBottomColor, Children, CustomStyle, headerBoxShadow, spacingCard, spacingHuger} from "../../../styles"

interface Props {
  readonly hasShadow?: boolean
  readonly hasGreyBackground?: boolean
  readonly customBackgroundColor?: string
  readonly children?: React.ReactNode | React.ReactNode[]
}

export const CardHeader: React.FC<Props & CustomStyle> = ({
  children,
  hasShadow,
  hasGreyBackground,
  customBackgroundColor,
  customStyles
}) => (
  <div css={[styles({hasShadow, hasGreyBackground, customBackgroundColor}), customStyles]} className={"card-header"}>
    {children}
  </div>
)

interface StyleParams {
  hasShadow?: boolean
  hasGreyBackground?: boolean
  customBackgroundColor?: string
}

const styles = ({hasShadow, hasGreyBackground, customBackgroundColor}: StyleParams) =>
  css({
    display: "flex",
    alignItems: "center",
    position: "relative",
    padding: spacingCard,
    boxShadow: hasShadow ? headerBoxShadow : "none",
    backgroundColor: hasGreyBackground ? cardBottomColor : customBackgroundColor ? customBackgroundColor : "initial",
    height: spacingHuger,
    boxSizing: "border-box"
  })
