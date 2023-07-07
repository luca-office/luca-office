import {css} from "@emotion/react"
import * as React from "react"
import {IconName} from "../../enums"
import {CustomStyle, Flex, spacing, spacingMedium, spacingSmall, TextSize} from "../../styles"
import {Icon} from "../icon/icon"
import {Paper} from "../paper/paper"
import {Text} from "../typography/typography"

interface Props extends CustomStyle {
  readonly onCloseClick: () => void
  readonly title: string
  readonly iconName: IconName
}

export const LocalFileChip: React.FC<Props> = ({onCloseClick, title, iconName, customStyles}) => {
  return (
    <Paper customStyles={[Flex.row, styles.paper, customStyles]}>
      <Icon name={iconName} />
      <Text customStyles={styles.text} size={TextSize.Medium}>
        {title}
      </Text>
      <Icon customStyles={styles.removeIcon} onClick={onCloseClick} name={IconName.Close} />
    </Paper>
  )
}

const styles = {
  paper: css({
    marginRight: spacingMedium,
    padding: spacingSmall
  }),
  text: css({
    margin: spacing(0, spacingSmall)
  }),
  removeIcon: css({
    cursor: "pointer"
  })
}
