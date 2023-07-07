import {css} from "@emotion/react"
import * as React from "react"
import {IconName} from "../../enums"
import {CustomStyle, Flex, fontColor, fontFamily, FontWeight, spacingTiny, textEllipsis, TextSize} from "../../styles"
import {Icon} from "../icon/icon"

export interface LabelProps extends CustomStyle {
  readonly label: string
  readonly icon?: IconName
}

export const Label: React.FC<LabelProps> = ({label, icon, customStyles}) => (
  <div css={[styles.label, customStyles]}>
    {label}
    {icon && <Icon name={icon} customStyles={styles.icon} />}
  </div>
)

const Size = {
  label: 24,
  icon: 12
}

const styles = {
  label: css(textEllipsis, Flex.row, {
    color: fontColor,
    fontSize: TextSize.Medium,
    fontWeight: FontWeight.Bold,
    fontFamily: fontFamily,
    height: Size.label,
    lineHeight: 1,
    letterSpacing: 0.15,
    marginBottom: spacingTiny
  }),
  icon: css({
    marginLeft: spacingTiny,
    height: Size.icon,
    width: Size.icon
  })
}
