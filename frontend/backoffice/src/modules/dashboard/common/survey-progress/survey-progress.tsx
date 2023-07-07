import {css} from "@emotion/react"
import * as React from "react"
import {Card, CardContent, CardFooter, CardHeader, Heading, Icon, Text} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {CompletedParticipantCount, Survey, SurveyResultsOverview, UserAccount} from "shared/models"
import {
  backgroundColorBlue,
  backgroundColorGreen,
  boxHeightSmall,
  Flex,
  fontColor,
  fontColorLight,
  spacing,
  spacingMedium,
  successColor,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {DonutChartWithLegend, RatingProgressCard} from "../../../../components"
import {SurveyTiming} from "../../../../enums"
import {getManualSurveyTimingStatus, getSurveyTimingStatus} from "../../../../utils"
import {isManualSurvey} from "../../../surveys/utils/common"
import {getSurveyProgressData} from "../../utils"
import {MonitoringManualSurveyCardContainer} from "./monitoring-manual-survey-card/monitoring-manual-survey-card-container"
import {ReportingCard} from "./reporting-card/reporting-card"

export interface SurveyProgressProps {
  readonly navigateToProjectDashboard: () => void
  readonly navigateToRatingOverview: () => void
  readonly navigateToReportingOverview: () => void
  readonly survey: Survey
  readonly surveyResultsOverview: Option<SurveyResultsOverview>
  readonly isRatingFinalized: boolean
  readonly raters: UserAccount[]
  readonly completedParticipantsCount: CompletedParticipantCount
}

export const SurveyProgress: React.FunctionComponent<SurveyProgressProps> = ({
  navigateToProjectDashboard,
  navigateToRatingOverview,
  navigateToReportingOverview,
  survey,
  surveyResultsOverview,
  isRatingFinalized,
  raters,
  completedParticipantsCount
}) => {
  const {t} = useLucaTranslation()

  const isManualSurveyExecutionType = isManualSurvey(Option.of(survey.executionType))
  const surveyTiming = isManualSurveyExecutionType
    ? getManualSurveyTimingStatus(survey)
    : getSurveyTimingStatus(survey.startsAt, survey.endsAt)

  const invitedRatersCount = raters.length

  return (
    <React.Fragment>
      {isManualSurveyExecutionType ? (
        <MonitoringManualSurveyCardContainer
          survey={survey}
          surveyTiming={surveyTiming}
          navigateToProjectDashboard={navigateToProjectDashboard}
        />
      ) : (
        <Card hasShadow={true} onClick={navigateToProjectDashboard} customStyles={styles.chart} animateOnHover={true}>
          <CardHeader
            customStyles={styles.cardHeader}
            customBackgroundColor={survey.isCompleted ? backgroundColorGreen : backgroundColorBlue}>
            <Heading level={HeadingLevel.h2}>{t("dashboard__progress_project_title")}</Heading>
            <Icon name={IconName.PaperEdit} height={boxHeightSmall} width={boxHeightSmall} />
          </CardHeader>
          <CardContent customStyles={styles.card}>
            <DonutChartWithLegend
              legendLabel={t("dashboard__progress_chart_legend", {count: survey.invitationsCount})}
              data={getSurveyProgressData(survey, Option.none(), t)}
              chartIcon={IconName.PaperEdit}
            />
          </CardContent>
          <CardFooter
            customStyles={styles.cardHeader}
            customBackgroundColor={survey.isCompleted ? backgroundColorGreen : backgroundColorBlue}>
            <Text size={TextSize.Medium}>
              {t(
                survey.isCompleted
                  ? "dashboard__progress_ended"
                  : surveyTiming === SurveyTiming.Future
                  ? "dashboard__progress_future"
                  : "dashboard__progress_running"
              )}
            </Text>
            <Icon
              name={
                survey.isCompleted
                  ? IconName.Check
                  : surveyTiming === SurveyTiming.Future
                  ? IconName.Sandglass
                  : IconName.Play
              }
              color={survey.isCompleted ? successColor : fontColor}
            />
          </CardFooter>
        </Card>
      )}

      <Card
        hasShadow={true}
        customStyles={[styles.chart, styles.cardInDisabledMarker]}
        onClick={navigateToRatingOverview}
        animateOnHover={true}>
        <CardHeader
          customStyles={styles.cardHeader}
          customBackgroundColor={isRatingFinalized ? backgroundColorGreen : backgroundColorBlue}>
          <Heading level={HeadingLevel.h2}>{t("dashboard__progress_scoring_title")}</Heading>
          <Icon name={IconName.PaperCorrection} height={boxHeightSmall} width={boxHeightSmall} />
        </CardHeader>
        <CardContent customStyles={styles.card}>
          <RatingProgressCard
            customChartStyles={styles.ratingProgressChart}
            surveyId={survey.id}
            showHeader={false}
            legendLabelKey={"rating__raters_label"}
            inProgressCaptionKey={"rating__ongoing_count"}
            finishedCaptionKey={"rating__finished_count"}
          />
        </CardContent>
        <CardFooter
          customStyles={styles.cardHeader}
          customBackgroundColor={isRatingFinalized ? backgroundColorGreen : backgroundColorBlue}>
          <Text size={TextSize.Medium}>
            {isRatingFinalized
              ? t("dashboard__scoring_finished")
              : invitedRatersCount === 0
              ? t("dashboard__scoring_future")
              : t("dashboard__scoring_ongoing")}
          </Text>
          <Icon
            name={isRatingFinalized ? IconName.Check : invitedRatersCount === 0 ? IconName.Sandglass : IconName.Play}
            color={isRatingFinalized ? successColor : fontColor}
          />
        </CardFooter>
      </Card>

      {surveyResultsOverview
        .map(resultsOverview => (
          <ReportingCard
            onClick={navigateToReportingOverview}
            surveyResultsOverview={resultsOverview}
            completedParticipantsCount={completedParticipantsCount}
          />
        ))
        .orNull()}
    </React.Fragment>
  )
}
const styles = {
  card: css({
    padding: spacing(spacingMedium),
    width: "auto"
  }),
  cardGrid: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridColumnGap: spacingMedium
  }),
  placeholder: css({
    color: fontColorLight,
    textAlign: "center",
    height: 144
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
  ratingPostLegendElementWrapper: css(Flex.row, {
    justifyContent: "space-between"
  }),
  ratingProgressChart: css({
    padding: 0,
    boxShadow: "initial",
    borderRadius: "initial",
    height: "initial"
  })
}
