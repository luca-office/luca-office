import {css} from "@emotion/react"
import React from "react"
import {Card, CardContent, CardFooter, CardHeader, Heading, Icon, ProgressBar, Text} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {CompletedParticipantCount, SurveyResultsOverview} from "shared/models"
import {
  backgroundColorGreen,
  boxHeightSmall,
  cardBottomColor,
  Flex,
  FontWeight,
  spacing,
  spacingMedium,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {toPercent} from "shared/utils"
import {getFinishedModulesCount} from "../../../../../utils/reporting"

export interface ReportingCardProps {
  readonly surveyResultsOverview: SurveyResultsOverview
  readonly onClick: () => void
  readonly completedParticipantsCount: CompletedParticipantCount
}

export const ReportingCard: React.FC<ReportingCardProps> = ({
  surveyResultsOverview,
  onClick,
  completedParticipantsCount
}) => {
  const {t} = useLucaTranslation()

  const {
    maximumScore,
    averageScore,
    areResultsComplete,
    projectModuleResults,
    participantResults
  } = surveyResultsOverview

  const finishedModulesCount = getFinishedModulesCount(projectModuleResults)
  const averageScoreInPercent = toPercent(averageScore ?? 0, maximumScore)
  const noReportsExisting = participantResults.length === 0

  return (
    <Card
      onClick={onClick}
      hasShadow={true}
      animateOnHover={true}
      customStyles={[styles.chart, styles.cardInDisabledMarker]}>
      <CardHeader
        customBackgroundColor={areResultsComplete && !noReportsExisting ? backgroundColorGreen : cardBottomColor}
        customStyles={styles.cardHeader}>
        <Heading level={HeadingLevel.h2}>{t("dashboard__progress_reports_title")}</Heading>
        <Icon name={IconName.PaperComplete} height={boxHeightSmall} width={boxHeightSmall} />
      </CardHeader>
      <CardContent customStyles={styles.card}>
        <div css={styles.reportingRow}>
          <Text size={TextSize.Medium}>{t("dashboard__progress_reports_finished_modules")}</Text>
          <Text size={TextSize.Medium}>{`${finishedModulesCount} / ${projectModuleResults.length}`}</Text>
        </div>
        <div css={styles.reportingRow}>
          <Text size={TextSize.Medium}>{t("dashboard__progress_reports_fully_rate_abbr")}</Text>
          <Text size={TextSize.Medium}>
            {completedParticipantsCount.numCompletedParticipants} / {completedParticipantsCount.totalParticipants}
          </Text>
        </div>
        <div css={styles.reportingRow}>
          <Text size={TextSize.Medium}>{t("dashboard__progress_reports_maximum_score")}</Text>
          <Text size={TextSize.Medium}>{maximumScore}</Text>
        </div>
        <div css={styles.reportingRow}>
          <Text customStyles={styles.averageText} size={TextSize.Medium}>
            {t("dashboard__progress_reports_survey_average")}
          </Text>
          <Text customStyles={styles.averageText} size={TextSize.Medium}>
            {Number(averageScore?.toFixed(2) ?? 0)}
          </Text>
        </div>
        <ProgressBar progressInPercent={averageScoreInPercent} verticalLinePositionInPercent={averageScoreInPercent} />
      </CardContent>
      <CardFooter customStyles={styles.cardHeader}>
        <Text size={TextSize.Medium}>
          {t(
            noReportsExisting
              ? "dashboard__progress_reports_no_reports"
              : areResultsComplete
              ? "dashboard__progress_reports_all_reports_done"
              : "dashboard__progress_reports_missing_reports"
          )}
        </Text>
        <Icon name={areResultsComplete && !noReportsExisting ? IconName.Check : IconName.Sandglass} />
      </CardFooter>
    </Card>
  )
}

const styles = {
  card: css({
    padding: spacing(spacingMedium),
    width: "auto"
  }),
  chart: css({
    cursor: "pointer",
    border: 0
  }),
  cardHeader: css({
    justifyContent: "space-between"
  }),
  cardInDisabledMarker: css({
    height: "100%"
  }),
  reportingRow: css(Flex.row, {
    justifyContent: "space-between"
  }),
  averageText: css({
    fontWeight: FontWeight.Bold
  })
}
