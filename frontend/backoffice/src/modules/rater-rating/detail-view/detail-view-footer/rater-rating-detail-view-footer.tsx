import {css} from "@emotion/react"
import * as React from "react"
import {ProgressBarColumn, Text, Tooltip} from "shared/components"
import {
  backgroundColorBright,
  boxSizeLarge,
  FontWeight,
  footerBoxShadow,
  gradientPrimary,
  spacing,
  spacingHuge,
  spacingLarge,
  spacingSmall,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {RaterRatingActionButton} from "../../common"

export interface RaterRatingDetailViewFooterProps {
  readonly surveyId: UUID
  readonly userAccountId: UUID
  readonly ratingPercentage: number
  readonly totalEntitiesCount: number
  readonly ratedEntitiesCount: number
  readonly disabled?: boolean
}

export const RaterRatingDetailViewFooter: React.FC<RaterRatingDetailViewFooterProps> = ({
  surveyId,
  userAccountId,
  ratingPercentage,
  totalEntitiesCount,
  ratedEntitiesCount,
  disabled
}) => {
  const {t} = useLucaTranslation()
  return (
    <div css={[styles.gridColumn, styles.footer]}>
      <div css={[styles.gridColumn, styles.progress]}>
        <Tooltip title={t("rater_rating__action_button_finish_rating_tooltip")}>
          <ProgressBarColumn
            customProgressBarStyles={styles.progressBar}
            barColor={gradientPrimary}
            displayLabel={false}
            displayCompleteIcon={false}
            progressCount={ratedEntitiesCount}
            overallCount={totalEntitiesCount}
          />
        </Tooltip>
        <Text customStyles={styles.progressLabel} size={TextSize.Medium}>
          {t("percentage", {percentage: ratingPercentage})}
        </Text>
      </div>
      <RaterRatingActionButton surveyId={surveyId} userAccountId={userAccountId} disabled={disabled} />
    </div>
  )
}

const styles = {
  gridColumn: css({
    display: "grid",
    gridTemplateColumns: "1fr minmax(min-content, max-content)",
    alignItems: "center"
  }),
  footer: css({
    gridColumnGap: spacingLarge,
    height: boxSizeLarge,
    backgroundColor: backgroundColorBright,
    boxShadow: footerBoxShadow,
    padding: spacing(0, spacingHuge, 0, spacingHuge + spacingLarge)
  }),
  progress: css({
    gridColumnGap: spacingSmall
  }),
  progressBar: css({
    margin: 0
  }),
  progressLabel: css({
    fontWeight: FontWeight.Bold
  })
}
