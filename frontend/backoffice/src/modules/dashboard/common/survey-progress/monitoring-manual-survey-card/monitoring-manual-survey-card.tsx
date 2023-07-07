import {css} from "@emotion/react"
import React from "react"
import {Card, CardContent, CardFooter, CardHeader, Heading, Icon, Text} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {SurveyExecutionType} from "shared/graphql/generated/globalTypes"
import {Survey} from "shared/models"
import {
  backgroundColorBlue,
  backgroundColorGreen,
  boxHeightSmall,
  fontColor,
  spacing,
  spacingMedium,
  successColor,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getProjectModuleTitle, isDefined, Option} from "shared/utils"
import {DonutChartWithLegend} from "../../../../../components"
import {SurveyTiming} from "../../../../../enums"
import {ProjectModuleManualSurvey} from "../../../../../redux/state/ui/synchron-survey-state"
import {getManualSynchronSurveyData} from "../../../utils"

interface Props {
  readonly navigateToProjectDashboard: () => void
  readonly survey: Survey
  readonly surveyTiming: SurveyTiming
  readonly activeModule: Option<ProjectModuleManualSurvey>
  readonly activeModuleIndexZeroBased: Option<number>
  readonly onlineCount: number
}

export const MonitoringManualSurveyCard: React.FC<Props> = ({
  activeModule,
  activeModuleIndexZeroBased,
  navigateToProjectDashboard,
  onlineCount,
  survey,
  surveyTiming
}) => {
  const {t} = useLucaTranslation()

  const moduleTitle = activeModule.map(module => getProjectModuleTitle(module)).orNull()
  const moduleIndexText = activeModuleIndexZeroBased.map(index => `${index + 1}.`).orNull()

  const isOpenParticipationEnabled = survey.isOpenParticipationEnabled
  const isManualAsynchronousSurvey = survey.executionType === SurveyExecutionType.ManualAsynchronous

  const hasSurveyEnded = isDefined(survey.manualPeriod?.end)

  return (
    <Card hasShadow={true} onClick={navigateToProjectDashboard} customStyles={styles.chart} animateOnHover={true}>
      <CardHeader
        customStyles={styles.cardHeader}
        customBackgroundColor={hasSurveyEnded ? backgroundColorGreen : backgroundColorBlue}>
        <Heading level={HeadingLevel.h2}>{t("dashboard__progress_monitoring_title")}</Heading>
        <Icon name={IconName.PaperEdit} height={boxHeightSmall} width={boxHeightSmall} />
      </CardHeader>
      <CardContent customStyles={styles.card}>
        <DonutChartWithLegend
          legendLabel={t(
            isOpenParticipationEnabled
              ? "dashboard__progress_chart_legend_open"
              : "dashboard__progress_chart_legend_abbr",
            {count: survey.invitationsCount}
          )}
          data={getManualSynchronSurveyData(
            survey,
            t,
            activeModule.map(module => module.id),
            onlineCount
          )}
          chartIcon={IconName.PaperEdit}
        />
      </CardContent>
      <CardFooter
        customStyles={styles.cardHeader}
        customBackgroundColor={hasSurveyEnded ? backgroundColorGreen : backgroundColorBlue}>
        <Text size={TextSize.Medium}>
          {moduleTitle !== null && !isManualAsynchronousSurvey && !hasSurveyEnded
            ? `${moduleIndexText} ${moduleTitle}`
            : t(
                hasSurveyEnded
                  ? "dashboard__progress_ended"
                  : surveyTiming === SurveyTiming.Future
                  ? "dashboard__progress_future"
                  : "dashboard__progress_running"
              )}
        </Text>
        <Icon
          name={
            hasSurveyEnded ? IconName.Check : surveyTiming === SurveyTiming.Future ? IconName.Sandglass : IconName.Play
          }
          color={hasSurveyEnded ? successColor : fontColor}
        />
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
  })
}
