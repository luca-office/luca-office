import {css} from "@emotion/react"
import React from "react"
import {IconName} from "../../enums"
import {Children, errorColor, Flex, fontColorBright, spacingSmall, TextSize} from "../../styles"
import {Text} from ".."
import {Icon} from "../icon/icon"
import {Tooltip} from "../tooltip/tooltip"

export interface WarningTooltipConfig {
  readonly label: string
  readonly customIcon?: IconName
}
export interface WarningTooltipProps extends Children {
  readonly placement?: "top" | "right" | "bottom" | "left" | undefined
  readonly inactive?: boolean
  readonly warningConfig: WarningTooltipConfig[]
}

export const WarningTooltip: React.FC<WarningTooltipProps> = ({warningConfig, inactive, placement, children}) => {
  const renderCustomContent = () => (
    <>
      {warningConfig.map(warning => (
        <div key={warning.label} css={styles.content}>
          <Icon customStyles={styles.icon} color={fontColorBright} name={warning.customIcon ?? IconName.Alert} />
          <Text size={TextSize.Small} customStyles={styles.text}>
            {warning.label}
          </Text>
        </div>
      ))}
    </>
  )

  return (
    <Tooltip
      renderCustomContent={renderCustomContent}
      inactive={inactive}
      placement={placement}
      backgroundColor={errorColor}
      title="">
      {children}
    </Tooltip>
  )
}

const styles = {
  content: css(Flex.row),
  text: css({
    color: fontColorBright
  }),
  icon: css({
    marginRight: spacingSmall
  })
}
