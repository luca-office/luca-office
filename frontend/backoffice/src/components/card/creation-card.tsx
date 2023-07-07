import {css} from "@emotion/react"
import * as React from "react"
import {Card, Icon} from "shared/components"
import {IconName} from "shared/enums"
import {CustomStyle, spacingTiny} from "shared/styles"

interface Props {
  readonly onClick?: () => void
  readonly text: string
}

export const CreationCard: React.FC<Props & CustomStyle> = ({onClick, text, customStyles}) => (
  <Card hasShadow animateOnHover customStyles={[styles.card, customStyles]} onClick={onClick}>
    <Icon customStyles={styles.icon} name={IconName.Add} />
    {text}
  </Card>
)

const styles = {
  card: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 144,
    cursor: "pointer"
  }),
  icon: css({
    marginRight: spacingTiny
  })
}
