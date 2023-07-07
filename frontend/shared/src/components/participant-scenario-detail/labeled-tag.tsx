import {css} from "@emotion/react"
import * as React from "react"
import {Card, Text} from "../../components"
import {CustomStyle, FontWeight, spacing, spacingSmall, spacingTiny, TextSize} from "../../styles"

export interface LabeledCardProps extends CustomStyle {
  readonly label: string
  readonly children?: JSX.Element | JSX.Element[]
}

export const LabeledCard: React.FC<LabeledCardProps> = ({label, customStyles, children}) => (
  <div>
    <Text size={TextSize.Medium} customStyles={styles.label}>
      {label}
    </Text>
    <Card hasShadow={true} customStyles={[styles.card, customStyles]}>
      {children}
    </Card>
  </div>
)

const styles = {
  label: css({
    fontWeight: FontWeight.Bold,
    marginBottom: spacingTiny
  }),
  card: css({
    padding: spacing(6, spacingSmall)
  })
}
