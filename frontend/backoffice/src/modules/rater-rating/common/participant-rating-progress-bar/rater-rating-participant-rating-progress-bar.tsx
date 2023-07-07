import {css} from "@emotion/react"
import * as React from "react"
import {ProgressBarColumn, Text} from "shared/components"
import {gradientPrimary, spacingSmall, TextSize} from "shared/styles"
import {RatingProjectModule} from "../../models"

export interface RaterRatingParticipantRatingProgressBarProps {
  readonly ratingProjectModule: RatingProjectModule
}

export const RaterRatingParticipantRatingProgressBar: React.FC<RaterRatingParticipantRatingProgressBarProps> = ({
  ratingProjectModule
}) => (
  <div css={styles.content}>
    <Text
      size={
        TextSize.Medium
      }>{`${ratingProjectModule.ratedParticipantCount}/${ratingProjectModule.participantCount}`}</Text>
    <ProgressBarColumn
      customProgressBarStyles={styles.progressBar}
      barColor={gradientPrimary}
      displayLabel={false}
      displayCompleteIcon={false}
      progressCount={ratingProjectModule.ratedParticipantCount}
      overallCount={ratingProjectModule.participantCount}
    />
  </div>
)

const styles = {
  content: css({
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) 1fr",
    gridColumnGap: spacingSmall,
    alignItems: "center"
  }),
  progressBar: css({
    margin: 0
  })
}
