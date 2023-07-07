import {Chart as ChartJS, ChartConfiguration, registerables} from "chart.js"
import React from "react"
import {Chart} from "react-chartjs-2"
import {Button, Card, CardContent, CardFooter, CardHeader, LoadingIndicator, Tooltip} from "shared/components"
import {ButtonVariant, IconName, OfficeWindowType} from "shared/enums"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {SurveyEvent} from "shared/models"
import {Flex} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {convertMillisecondsToSeconds, convertSecondsToTimeString, Option} from "shared/utils"
import {ChartFooter} from "./chart-footer"
import {styles} from "./participant-activity-overview.style"
import {Diagram} from "./participant-activity-overview-container"
import {DocumentActivity} from "./utils/acitvity-overview-config"
import {getSurveyEventTime, ToolUsage} from "./utils/get-tool-usage-from-survey-events"

export interface DocumentActivityTotalTime {
  readonly relevance: DocumentActivity
  readonly totalTime: number
}

export interface ParticipantActivityOverviewProps {
  readonly surveyEvents: SurveyEvent[]
  readonly endTime: number
  readonly participantName: string
  readonly onClose: () => void
  readonly diagramType: Diagram
  readonly onDiagramTypeChange: (diagramType: Diagram) => void
  readonly displayWindows: OfficeWindowType[]
  readonly setDisplayWindows: (displayWindows: OfficeWindowType[]) => void
  readonly displayDocuments: DocumentActivity[]
  readonly setDisplayDocuments: (documents: DocumentActivity[]) => void
  readonly showToolUsage: boolean
  readonly setShowToolUsage: (showToolUsage: boolean) => void
  readonly barChartConfig: Option<ChartConfiguration>
  readonly lineChartConfig: Option<ChartConfiguration>
  readonly toolUsages: Option<ToolUsage[]>
  readonly loading: boolean
  readonly documentActivityTotalTime: DocumentActivityTotalTime[]
}

export const ParticipantActivityOverview: React.FC<ParticipantActivityOverviewProps> = ({
  surveyEvents,
  participantName,
  onClose,
  diagramType,
  onDiagramTypeChange,
  displayWindows,
  setDisplayWindows,
  showToolUsage,
  setShowToolUsage,
  displayDocuments,
  setDisplayDocuments,
  barChartConfig,
  lineChartConfig,
  toolUsages,
  documentActivityTotalTime,
  loading
}) => {
  const {t} = useLucaTranslation()

  ChartJS.register(...registerables)

  const startTime = surveyEvents.find(event => event.eventType === SurveyEventType.StartScenario)?.timestamp.getTime()
  const resumptionEvents =
    startTime !== undefined
      ? surveyEvents
          .filter(event => event.eventType === SurveyEventType.ResumeScenario)
          .map(resumptionEvent => getSurveyEventTime(resumptionEvent, startTime))
      : []

  return (
    <Card customStyles={styles.card} hasShadow>
      <CardHeader hasShadow={true} hasGreyBackground={true} customStyles={styles.header}>
        <div>{t("activity_tool_usage__header", {participantName})}</div>
        <Button icon={IconName.Close} variant={ButtonVariant.IconOnly} onClick={onClose} />
      </CardHeader>
      <CardContent customStyles={styles.content}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <Card hasShadow={true}>
            <CardHeader hasShadow={true} hasGreyBackground={true} customStyles={styles.header}>
              <div css={Flex.row}>
                <div onClick={() => setShowToolUsage(true)} css={styles.subheader(showToolUsage)}>
                  {t("activity_tool_usage__subheader_tool_usage")}
                </div>
                <div onClick={() => setShowToolUsage(false)} css={styles.subheader(!showToolUsage)}>
                  {t("activity_tool_usage__subheader_activity")}
                </div>
              </div>
              <div css={Flex.row}>
                <div css={styles.diagramTitle}>
                  {diagramType === Diagram.BarDiagram
                    ? t("activity_tool_usage__diagram_title_total_time")
                    : t("activity_tool_usage__diagram_title_impulse")}
                </div>
                <Tooltip
                  title={t("activity_tool_usage__diagram_title_impulse")}
                  text={t("activity_tool_usage__diagram_title_impulse_tooltip")}
                  icon={IconName.PulseDiagram}>
                  <Button
                    icon={IconName.PulseDiagram}
                    variant={ButtonVariant.IconOnly}
                    onClick={() => onDiagramTypeChange(Diagram.ScatterDiagram)}
                    customStyles={styles.leftDiagramButton(diagramType === Diagram.ScatterDiagram)}
                    customIconStyles={styles.diagramButtonIcon(diagramType === Diagram.ScatterDiagram)}
                  />
                </Tooltip>
                <Tooltip
                  title={t("activity_tool_usage__diagram_title_total_time")}
                  text={t("activity_tool_usage__diagram_title_total_time_tooltip")}
                  icon={IconName.BarDiagram}>
                  <Button
                    icon={IconName.BarDiagram}
                    variant={ButtonVariant.IconOnly}
                    onClick={() => onDiagramTypeChange(Diagram.BarDiagram)}
                    customStyles={styles.rightDiagramButton(diagramType === Diagram.BarDiagram)}
                    customIconStyles={styles.diagramButtonIcon(diagramType === Diagram.BarDiagram)}
                  />
                </Tooltip>
              </div>
            </CardHeader>
            <Card customStyles={styles.diagramCard}>
              {diagramType === Diagram.BarDiagram
                ? barChartConfig
                    .map(config => <Chart type="bar" data={config.data} options={config.options} />)
                    .orNull()
                : lineChartConfig
                    .map(config => <Chart type="scatter" data={config.data} options={config.options} />)
                    .orNull()}
            </Card>
            <ChartFooter
              showToolUsage={showToolUsage}
              displayWindows={displayWindows}
              displayDocuments={displayDocuments}
              setDisplayWindows={setDisplayWindows}
              setDisplayDocuments={setDisplayDocuments}
              toolUsages={toolUsages.getOrElse([])}
              documentActivityTotalTime={documentActivityTotalTime}
            />
            {resumptionEvents.length > 0 && (
              <CardFooter>
                {t("activity_tool_usage__diagram_footer_resumption_notice") +
                  resumptionEvents
                    .map(event => convertSecondsToTimeString(convertMillisecondsToSeconds(event)))
                    .join(", ")}
              </CardFooter>
            )}
          </Card>
        )}
      </CardContent>
      <CardFooter customStyles={styles.emptyFooter} />
    </Card>
  )
}
