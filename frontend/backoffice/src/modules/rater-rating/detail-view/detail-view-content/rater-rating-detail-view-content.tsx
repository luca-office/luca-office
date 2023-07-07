import {css} from "@emotion/react"
import * as React from "react"
import {LoadingIndicator} from "shared/components"
import {
  backgroundColorBright,
  borderRadius,
  spacing,
  spacingHuge,
  spacingLarge,
  spacingMedium,
  spacingSmall
} from "shared/styles"
import {RaterRatingContentInfo} from "./content-info/rater-rating-content-info"
import {RaterRatingContentParticipantList} from "./content-participant-list/rater-rating-content-participant-list"
import {RaterRatingContentSettings} from "./content-settings/rater-rating-content-settings"
import {useRaterRatingDetailViewContent} from "./hooks/use-rater-rating-detail-view-content"

export interface RaterRatingDetailViewContentProps {
  readonly userAccountId: UUID
  readonly surveyId: UUID
}

export const RaterRatingDetailViewContent: React.FC<RaterRatingDetailViewContentProps> = ({
  userAccountId,
  surveyId
}) => {
  const {dataLoading, survey: surveyOption} = useRaterRatingDetailViewContent(surveyId)

  return (
    <div css={styles.container}>
      <div css={styles.content(dataLoading)}>
        {dataLoading ? (
          <LoadingIndicator />
        ) : (
          surveyOption
            .map(survey => (
              <React.Fragment>
                <RaterRatingContentInfo survey={survey} />
                <RaterRatingContentSettings customStyles={styles.settings} survey={survey} />
                <RaterRatingContentParticipantList
                  customStyles={styles.participantList}
                  userAccountId={userAccountId}
                  survey={survey}
                />
              </React.Fragment>
            ))
            .orNull()
        )}
      </div>
    </div>
  )
}

const styles = {
  container: css({
    padding: spacing(spacingMedium, spacingHuge),
    overflow: "auto"
  }),
  content: (loading: boolean) =>
    css({
      ...(loading
        ? {display: "flex", justifyContent: "center", alignItems: "center"}
        : {display: "grid", gridTemplateRows: "repeat(2, minmax(min-content, max-content)) 1fr"}),
      padding: spacing(spacingLarge, spacingMedium, spacingMedium, spacingMedium),
      borderRadius: borderRadius,
      backgroundColor: backgroundColorBright
    }),
  settings: css({
    marginTop: spacingHuge + spacingSmall
  }),
  participantList: css({
    marginTop: spacingLarge
  })
}
