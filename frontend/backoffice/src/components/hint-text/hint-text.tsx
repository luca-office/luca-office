import {css} from "@emotion/react"
import * as React from "react"
import {Icon, Text} from "shared/components"
import {IconName} from "shared/enums"
import {borderRadius, CustomStyle, Flex, insetShadow, spacingSmall, TextSize} from "shared/styles"

export interface HintTextProps extends CustomStyle {
  readonly text: string
}

export const HintText: React.FunctionComponent<HintTextProps> = ({text, customStyles}) => {
  return (
    <div css={[styles.testInfoLine, customStyles]}>
      <Icon name={IconName.Information} hasSpacing={true} />
      <Text>{text}</Text>
    </div>
  )
}

const styles = {
  testInfoLine: css(Flex.row, {
    padding: spacingSmall,
    background: "white",
    boxShadow: insetShadow,
    fontSize: TextSize.Small,
    borderRadius: borderRadius
  })
}
