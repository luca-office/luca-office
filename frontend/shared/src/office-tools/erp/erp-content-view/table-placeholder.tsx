import {css} from "@emotion/react"
import React from "react"
import {Icon, Text} from "../../../components"
import {IconName} from "../../../enums"
import {boxSizeLarge, Flex, fontColorLight, spacingSmall, TextSize} from "../../../styles"

export interface TablePlaceholderProps {
  readonly title?: string
  readonly subTitle: string
  readonly icon?: IconName
}

export const TablePlaceholder: React.FC<TablePlaceholderProps> = ({title, subTitle, icon}) => (
  <div css={styles.container}>
    {title && <Text size={TextSize.Medium}>{title}</Text>}
    <div css={Flex.row}>
      {icon && <Icon customStyles={{marginRight: spacingSmall}} name={icon} />}
      <Text customStyles={{color: fontColorLight}} size={TextSize.Medium}>
        {subTitle}
      </Text>
    </div>
  </div>
)

const Sizes = {
  cardFooterHeight: 24
}

const styles = {
  container: css(Flex.column, {
    justifyContent: "center",
    alignItems: "center",
    height: `calc(100% - ${boxSizeLarge}px - ${Sizes.cardFooterHeight}px)`
  })
}
