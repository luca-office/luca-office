import {css} from "@emotion/react"
import * as React from "react"
import {
  borderRadius,
  Children,
  CustomStyle,
  fontColor,
  FontWeight,
  spacing,
  spacingCard,
  spacingMedium,
  spacingTiny,
  textEllipsis,
  TextSize
} from "../../styles"

interface Props extends Children {
  readonly label?: string
  readonly title?: string
  readonly onClick?: () => void
}

export const Paper: React.FC<CustomStyle & Props> = ({children, customStyles, label, title, onClick}) => (
  <div onClick={onClick}>
    {!!label && <div css={[styles.textOverflowHidden, styles.label]}>{label}</div>}
    <div title={title} css={[styles.container, customStyles]}>
      {children}
    </div>
  </div>
)

const Size = {
  label: 20
}

const styles = {
  textOverflowHidden: textEllipsis,
  label: css({
    color: fontColor,
    fontSize: TextSize.Medium,
    fontWeight: FontWeight.Bold,
    height: Size.label,
    lineHeight: `${Size.label}px`,
    letterSpacing: 0.15,
    marginBottom: spacingTiny
  }),
  container: css({
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.16)",
    borderRadius: borderRadius,
    boxSizing: "border-box",
    background: "white",
    userSelect: "none",
    padding: spacing(spacingCard, spacingMedium)
  })
}
