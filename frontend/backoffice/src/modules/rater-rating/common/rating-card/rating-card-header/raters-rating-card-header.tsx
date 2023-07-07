import {css} from "@emotion/react"
import * as React from "react"
import {CardHeader, Text} from "shared/components"
import {RatingStatus} from "shared/enums"
import {spacing, spacingCard, spacingSmall, textEllipsis, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getRatingStatusLabel} from "../../../utils"

export interface RatersRatingCardHeaderProps {
  readonly title: string
  readonly status: RatingStatus
}

export const RatersRatingCardHeader: React.FC<RatersRatingCardHeaderProps> = ({title, status}) => {
  const {t} = useLucaTranslation()
  return (
    <CardHeader customStyles={styles.header}>
      <Text customStyles={styles.title} size={TextSize.Medium}>
        {title}
      </Text>
      <Text size={TextSize.Medium}>{getRatingStatusLabel(t, status)}</Text>
    </CardHeader>
  )
}

const styles = {
  header: css({
    display: "grid",
    gridTemplateColumns: "1fr minmax(min-content, max-content)",
    gridColumnGap: spacingSmall,
    height: "initial",
    padding: spacing(spacingCard, spacingCard, 0, spacingCard)
  }),
  title: css(textEllipsis)
}
