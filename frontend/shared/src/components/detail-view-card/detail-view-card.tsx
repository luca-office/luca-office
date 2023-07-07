import {css, SerializedStyles} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {CustomStyle, spacing, spacingLarge, spacingMedium} from "../../styles"
import {Card, LabelledCard} from "../card"

export interface DetailViewCardProps extends CustomStyle {
  readonly label?: string
  readonly content: React.ReactNode
  readonly footer?: React.ReactNode
  readonly cardHeader?: React.ReactNode
  readonly customContentStyles?: SerializedStyles
  readonly customLabelledCardStyles?: CSSInterpolation
}

export const DetailViewCard: React.FC<DetailViewCardProps> = ({
  customStyles,
  label,
  content,
  footer,
  cardHeader,
  customContentStyles,
  customLabelledCardStyles
}) => {
  const card = (
    <Card customStyles={styles.card}>
      {cardHeader}
      <div css={[styles.content, customContentStyles]} className={"card-content"}>
        {content}
      </div>
      {footer}
    </Card>
  )
  return (
    <div css={customStyles}>
      {label !== undefined ? (
        <LabelledCard customStyles={customLabelledCardStyles} label={label}>
          {card}
        </LabelledCard>
      ) : (
        card
      )}
    </div>
  )
}

const styles = {
  card: css({
    border: 0
  }),
  content: css({
    padding: spacing(spacingMedium, spacingLarge, spacingMedium, spacingLarge)
  })
}
