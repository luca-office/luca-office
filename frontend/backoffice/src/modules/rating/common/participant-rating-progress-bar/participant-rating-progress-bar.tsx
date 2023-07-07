import {css} from "@emotion/react"
import * as React from "react"
import {ProgressBarColumn, Text, Tooltip} from "shared/components"
import {gradientPrimary, spacingLarge, textEllipsis, TextSize} from "shared/styles"
import {LucaTFunction} from "shared/translations"

export interface ParticipantRatingProgressBarProps {
  readonly progressCount: number
  readonly overallCount: number
  readonly t: LucaTFunction
}

export const ParticipantRatingProgressBar: React.FC<ParticipantRatingProgressBarProps> = ({
  progressCount,
  overallCount,
  t
}) => (
  <div css={styles.container}>
    <Tooltip title={t("rating__final_score_project_modules_tooltip")}>
      <Text customStyles={styles.label} size={TextSize.Medium}>{`${progressCount}/${overallCount}`}</Text>
    </Tooltip>
    <ProgressBarColumn
      customProgressBarStyles={styles.progressBar}
      barColor={gradientPrimary}
      displayLabel={false}
      displayCompleteIcon={false}
      progressCount={progressCount}
      overallCount={overallCount}
    />
  </div>
)

const Size = {
  label: 38
}

const styles = {
  container: css({
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) 1fr",
    gridColumnGap: spacingLarge,
    alignItems: "center"
  }),
  label: css(textEllipsis, {
    minWidth: Size.label
  }),
  progressBar: css({
    margin: 0
  })
}
