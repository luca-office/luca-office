import {css} from "@emotion/react"
import {round} from "lodash"
import * as React from "react"
import {Heading, Paper, ProgressBar, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {
  backgroundColorBright,
  backgroundColorLight,
  borderRadius,
  borderRadiusHuge,
  CustomStyle,
  FontWeight,
  insetShadow,
  spacing,
  spacingCard,
  spacingLarge,
  spacingMedium,
  spacingSmaller,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {roundNumber} from "shared/utils"
import {ReportingOverviewSize, reportingOverviewStyles} from "../reporting-overview.style"

export interface ReportingOverviewMetadataProps extends CustomStyle {
  readonly averageScore: number
  readonly maximumScore: number
  readonly participantScore: number
}

export const ReportingOverviewMetadata: React.FC<ReportingOverviewMetadataProps> = ({
  customStyles,
  averageScore,
  maximumScore,
  participantScore
}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={[reportingOverviewStyles.dataContentWrapper, customStyles]}>
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("reporting_overview_reached_points")}
      </Heading>
      <div css={styles.metadataContent}>
        <ProgressBar
          customStyles={styles.progressBar}
          customHeight={ReportingOverviewSize.progressBar}
          progressInPercent={roundNumber((participantScore / maximumScore) * 100)}
          verticalLinePositionInPercent={roundNumber((averageScore / maximumScore) * 100)}
          verticalLineTooltipText={`${t("dashboard__progress_reports_survey_average")} ${
            averageScore === 1
              ? t("coding_criteria__criterion_list_score_singular", {score: averageScore})
              : t("coding_criteria__criterion_list_score", {score: averageScore})
          }`}
        />
        <div css={styles.metadataContentPointsWrapper}>
          <div css={styles.metadataContentPoints}>
            <div css={reportingOverviewStyles.dataContentWrapper}>
              <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                {t("reporting_overview_maximum_points")}
              </Heading>
              <Paper customStyles={styles.scorePaper}>
                {maximumScore === 1
                  ? t("coding_criteria__criterion_list_score_singular", {score: maximumScore})
                  : t("coding_criteria__criterion_list_score", {score: maximumScore})}
              </Paper>
            </div>
            <div css={reportingOverviewStyles.dataContentWrapper}>
              <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                {t("reporting_result__average_finalscore_label")}
              </Heading>
              <Paper customStyles={styles.scorePaper}>
                {t("coding_criteria__criterion_list_score", {score: round(averageScore, 2)})}
              </Paper>
            </div>
          </div>
          <div css={reportingOverviewStyles.dataContentWrapper}>
            <Heading customStyles={styles.participantScoreLabel} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
              {t("reporting__overview_participant_score")}
            </Heading>
            <Text size={TextSize.Larger}>{t("coding_criteria__criterion_list_score", {score: participantScore})}</Text>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  metadataContent: css({
    display: "grid",
    gridTemplateRows: "repeat(2, minmax(min-content, max-content))",
    gridRowGap: spacingLarge,
    boxShadow: insetShadow,
    borderRadius: borderRadius,
    backgroundColor: backgroundColorLight,
    padding: spacingMedium,
    boxSizing: "border-box"
  }),
  metadataContentPointsWrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr minmax(min-content, max-content)",
    gridColumnGap: spacingMedium
  }),
  metadataContentPoints: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(min-content, max-content))",
    gridColumnGap: spacingMedium
  }),
  scorePaper: css({
    minWidth: ReportingOverviewSize.scorePaper,
    padding: spacing(spacingSmaller, spacingCard),
    backgroundColor: backgroundColorBright
  }),
  participantScoreLabel: css({
    textAlign: "end"
  }),
  progressBar: css({
    borderRadius: borderRadiusHuge
  })
}
