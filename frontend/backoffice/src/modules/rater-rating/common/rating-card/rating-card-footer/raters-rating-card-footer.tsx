import {css} from "@emotion/react"
import * as React from "react"
import {CardFooter, Icon, ProgressBarColumn, Text} from "shared/components"
import {RatingStatus} from "shared/enums"
import {
  chartBackgroundBarColor,
  flex1,
  FontWeight,
  gradientPrimary,
  spacingCard,
  spacingMedium,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getRatingStatusIcon} from "../../../utils"

export interface RatersRatingCardFooterProps {
  readonly status: RatingStatus
  readonly ratingPercentage: number
  readonly totalEntitiesCount: number
  readonly ratedEntitiesCount: number
}

export const RatersRatingCardFooter: React.FC<RatersRatingCardFooterProps> = ({
  status,
  ratingPercentage,
  totalEntitiesCount,
  ratedEntitiesCount
}) => {
  const {t} = useLucaTranslation()
  return (
    <CardFooter customStyles={styles.footer}>
      <div css={styles.content}>
        <ProgressBarColumn
          customProgressBarStyles={styles.progressBar}
          barColor={status === RatingStatus.SurveyInProgress ? chartBackgroundBarColor : gradientPrimary}
          displayLabel={false}
          displayCompleteIcon={false}
          progressCount={ratedEntitiesCount}
          overallCount={totalEntitiesCount}
        />
        <div css={styles.content}>
          <Text customStyles={styles.label} size={TextSize.Medium}>
            {t("percentage", {percentage: ratingPercentage})}
          </Text>
          <Icon name={getRatingStatusIcon(status)} />
        </div>
      </div>
    </CardFooter>
  )
}

const styles = {
  footer: css({
    display: "block",
    height: "initial",
    padding: spacingCard
  }),
  content: css({
    display: "grid",
    gridTemplateColumns: "1fr minmax(min-content, max-content)",
    gridColumnGap: spacingMedium,
    alignItems: "center"
  }),
  progressBar: css({
    flex: flex1,
    margin: 0
  }),
  label: css({
    fontWeight: FontWeight.Bold
  })
}
