import {Chart as ChartJS, ChartConfiguration, registerables} from "chart.js"
import React from "react"
import {Chart} from "react-chartjs-2"
import {Button, Card, CardContent, CardFooter, CardHeader, LoadingIndicator, Tooltip} from "shared/components"
import {ButtonVariant, IconName, OfficeWindowType} from "shared/enums"
import {SurveyEvent} from "shared/models"
import {Flex} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {ChartFooter} from "./chart-footer"
import {DocumentActivityTotalTime} from "./participant-activity-overview"
import {styles} from "./participant-activity-overview.style"
import {Diagram} from "./participant-activity-overview-container"
import {DocumentActivity} from "./utils/acitvity-overview-config"
import {AllToolUsage} from "./utils/get-tool-usage-for-all-participants"

export interface AllParticipantsActivityOverviewProps {
  readonly participantCount: number
  readonly surveyEvents: SurveyEvent[]
  readonly endTime: number
  readonly onClose: () => void
  readonly diagramType: Diagram
  readonly onDiagramTypeChange: (diagramType: Diagram) => void
  readonly displayWindows: OfficeWindowType[]
  readonly setDisplayWindows: (displayWindows: OfficeWindowType[]) => void
  readonly displayDocuments: DocumentActivity[]
  readonly setDisplayDocuments: (documents: DocumentActivity[]) => void
  readonly showToolUsage: boolean
  readonly setShowToolUsage: (showToolUsage: boolean) => void
  readonly barChartConfig: ChartConfiguration
  readonly lineChartConfig: ChartConfiguration
  readonly allToolUsages: AllToolUsage[]
  readonly loading: boolean
  readonly documentActivityTotalTime: DocumentActivityTotalTime[]
}

export const AllParticipantsActivityOverview: React.FC<AllParticipantsActivityOverviewProps> = ({
  onClose,
  participantCount,
  diagramType,
  onDiagramTypeChange,
  displayWindows,
  setDisplayWindows,
  displayDocuments,
  showToolUsage,
  setDisplayDocuments,
  setShowToolUsage,
  lineChartConfig,
  barChartConfig,
  allToolUsages,
  loading,
  documentActivityTotalTime
}) => {
  const {t} = useLucaTranslation()

  ChartJS.register(...registerables)

  return (
    <Card customStyles={styles.card} hasShadow>
      <CardHeader hasShadow={true} hasGreyBackground={true} customStyles={styles.header}>
        <div>{t("activity_tool_usage__header_all", {participantCount: participantCount})}</div>
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
                    : t("activity_tool_usage__diagram_title_line")}
                </div>
                <Tooltip
                  title={t("activity_tool_usage__diagram_title_line")}
                  text={t("activity_tool_usage__diagram_title_line_tooltip")}
                  icon={IconName.LineDiagram}>
                  <Button
                    icon={IconName.LineDiagram}
                    variant={ButtonVariant.IconOnly}
                    onClick={() => onDiagramTypeChange(Diagram.ScatterDiagram)}
                    customStyles={styles.leftDiagramButton(diagramType === Diagram.ScatterDiagram)}
                    customIconStyles={styles.diagramButtonIcon(diagramType === Diagram.ScatterDiagram)}
                  />
                </Tooltip>
                <Tooltip
                  title={t("activity_tool_usage__diagram_title_total_time")}
                  text={t("activity_tool_usage__diagram_title_total_time_all_participants_tooltip")}
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
              {diagramType === Diagram.BarDiagram ? (
                <Chart type="bar" data={barChartConfig.data} options={barChartConfig.options} />
              ) : (
                <Chart type="scatter" data={lineChartConfig.data} options={lineChartConfig.options} />
              )}
            </Card>
            <ChartFooter
              showToolUsage={showToolUsage}
              displayWindows={displayWindows}
              displayDocuments={displayDocuments}
              setDisplayWindows={setDisplayWindows}
              setDisplayDocuments={setDisplayDocuments}
              toolUsages={allToolUsages}
              documentActivityTotalTime={documentActivityTotalTime}
            />
          </Card>
        )}
      </CardContent>
      <CardFooter customStyles={styles.emptyFooter} />
    </Card>
  )
}
