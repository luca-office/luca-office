import {css} from "@emotion/react"
import * as React from "react"
import {
  borderRadius,
  boxHeightMedium,
  cardBottomColor,
  Children,
  CustomStyle,
  spacing,
  spacingLarge,
  spacingSmall
} from "../../../styles"

export interface CardFooterProps extends CustomStyle, Children {
  readonly onClick?: React.MouseEventHandler<HTMLDivElement>
  readonly customBackgroundColor?: string
}

export const CardFooter: React.FC<CardFooterProps> = ({children, customStyles, onClick, customBackgroundColor}) => (
  <div css={[styles(customBackgroundColor), customStyles]} className={"card-footer"} onClick={onClick}>
    {children}
  </div>
)

const styles = (customBackgroundColor?: string) =>
  css({
    backgroundColor: customBackgroundColor || cardBottomColor,
    borderRadius: spacing(0, 0, borderRadius, borderRadius),
    padding: spacingSmall,
    height: boxHeightMedium,
    alignItems: "center",
    display: "flex",

    "> *:not(:last-child)": {
      marginRight: spacingLarge
    }
  })
