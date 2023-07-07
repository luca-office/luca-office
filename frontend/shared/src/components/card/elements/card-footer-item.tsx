import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {Icon, Text} from "../.."
import {IconName} from "../../../enums"
import {CustomStyle, spacingSmall, textEllipsis} from "../../../styles"

interface Props extends CustomStyle {
  readonly text?: string
  readonly icon?: IconName
  readonly iconColor?: string
  readonly title?: string
  readonly customTextStyles?: CSSInterpolation
}

export const CardFooterItem: React.FC<Props> = ({icon, iconColor, text, title, customStyles, customTextStyles}) => (
  <div title={title} css={[styles.container, customStyles]}>
    {icon && (
      <Icon
        {...{
          name: icon,
          ...(text && {customStyles: styles.icon}),
          color: iconColor
        }}
      />
    )}
    {text && <Text customStyles={[textEllipsis, customTextStyles]}>{text}</Text>}
  </div>
)

const styles = {
  container: css({
    display: "flex",
    alignItems: "center",
    minWidth: 0
  }),
  icon: css({
    marginRight: spacingSmall
  })
}
