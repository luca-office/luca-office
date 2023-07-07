import {css} from "@emotion/react"
import React from "react"
import {Icon, Text} from "../../../components"
import {IconName} from "../../../enums"
import {
  backgroundColorBright,
  borderRadius,
  CustomStyle,
  deepShadow,
  Flex,
  iconBrightColor,
  primaryColor,
  spacing,
  spacingHuge,
  spacingSmall,
  TextSize
} from "../../../styles"

export interface NavFooterButtonProps extends CustomStyle {
  readonly onClick: () => void
  readonly iconName: IconName
  readonly label: string
}

export const NavFooterButton: React.FC<NavFooterButtonProps> = ({onClick, iconName, label, customStyles}) => {
  return (
    <div css={customStyles}>
      <div css={styles.button} onClick={onClick}>
        <div css={styles.iconContainer}>
          <Icon color={iconBrightColor} name={iconName} />
        </div>
        <Text size={TextSize.Medium}>{label}</Text>
      </div>
    </div>
  )
}

const styles = {
  button: css(Flex.row, {
    height: spacingHuge,
    background: backgroundColorBright,
    boxShadow: deepShadow,
    borderRadius: borderRadius,
    cursor: "pointer"
  }),
  iconContainer: css(Flex.row, {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primaryColor,
    width: spacingHuge,
    height: spacingHuge,
    borderRadius: spacing(borderRadius, 0, 0, borderRadius),
    marginRight: spacingSmall
  })
}
