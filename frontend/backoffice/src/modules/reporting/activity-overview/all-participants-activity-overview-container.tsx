import {ChartConfiguration, ChartData} from "chart.js"
import {groupBy} from "lodash-es"
import React from "react"
import {OfficeWindowType} from "shared/enums"
import {SurveyEvent} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {convertSecondsToTimeString} from "shared/utils"
import {useScenarioDocuments} from "../../../graphql/hooks/queries/reporting/use-scenario-documents"
import {AllParticipantsActivityOverview} from "./all-participants-activity-overview"
import {Diagram} from "./participant-activity-overview-container"
import {
  allDisplayWindows,
  allDocumentActivity,
  colors,
  defaultOptions,
  DocumentActivity
} from "./utils/acitvity-overview-config"
import {getDocumentActivityForAllParticipants} from "./utils/get-document-activity-for-all-participants"
import {Activity, getDocumentActivityFromSurveyEvents} from "./utils/get-document-activity-from-survey-events"
import {getFooterCheckBoxLabel} from "./utils/get-footer-check-box-label"
import {getToolUsageForAllParticipants} from "./utils/get-tool-usage-for-all-participants"
import {getToolUsageFromSurveyEvents, ToolUsage} from "./utils/get-tool-usage-from-survey-events"

export interface AllParticipantsActivityOverviewContainerProps {
  readonly surveyEvents: SurveyEvent[]
  readonly endTime: number
  readonly onClose: () => void
  readonly participantCount: number
  readonly scenarioId: UUID
}

export const AllParticipantsActivityOverviewContainer: React.FC<AllParticipantsActivityOverviewContainerProps> = ({
  surveyEvents,
  endTime,
  onClose,
  participantCount,
  scenarioId
}) => {
  const {t} = useLucaTranslation()

  const {scenarioDocuments, scenarioDocumentsLoading} = useScenarioDocuments(scenarioId)

  const [diagramType, setDiagramType] = React.useState(Diagram.ScatterDiagram)
  const [displayWindows, setDisplayWindows] = React.useState(allDisplayWindows)
  const [displayDocuments, setDisplayDocuments] = React.useState(allDocumentActivity)
  const [showToolUsage, setShowToolUsage] = React.useState(true)

  const toolUsagesByParticipant = Object.values(
    groupBy(surveyEvents, surveyEvent => surveyEvent.invitationId)
  ).map(surveyEventsForParticipant => getToolUsageFromSurveyEvents(surveyEventsForParticipant).getOrElse([]))

  const allToolUsages = getToolUsageForAllParticipants(
    toolUsagesByParticipant.map(
      participantToolUsages =>
        new Map<OfficeWindowType, ToolUsage>(
          participantToolUsages.map(toolUsage => [toolUsage.tool, toolUsage] as [OfficeWindowType, ToolUsage])
        )
    )
  )

  const filteredToolUsages = allToolUsages.filter(usage => displayWindows.includes(usage.tool as OfficeWindowType))

  const documentActivitiesByParticipant = scenarioDocuments
    .map(scenarioDocuments =>
      Object.values(groupBy(surveyEvents, surveyEvent => surveyEvent.invitationId)).map(surveyEventsForParticipant =>
        getDocumentActivityFromSurveyEvents(surveyEventsForParticipant, scenarioDocuments).orNull()
      )
    )
    .getOrElse([])

  const allDocumentActivities = getDocumentActivityForAllParticipants(
    documentActivitiesByParticipant.map(participantDocumentActivities => {
      const activityMap = new Map<DocumentActivity, Activity[]>()
      activityMap.set(DocumentActivity.RequiredDocuments, participantDocumentActivities?.required ?? [])
      activityMap.set(DocumentActivity.Inactivity, participantDocumentActivities?.inactive ?? [])
      activityMap.set(DocumentActivity.IrrelevantDocuments, participantDocumentActivities?.irrelevant ?? [])
      return activityMap
    })
  )

  const filteredDocumentActivities = allDocumentActivities.filter(activity =>
    displayDocuments.includes(activity.documentActivity)
  )

  const toolUsageLineDataSets = filteredToolUsages.map(toolUsage => {
    return {
      labels: filteredToolUsages.map(tool => getFooterCheckBoxLabel(tool.tool, t)),
      data: toolUsage.usages.map(usage => {
        return {x: usage.time, y: usage.numOpenWindows}
      }),
      showLine: true,
      borderColor: colors.get(toolUsage.tool),
      label: getFooterCheckBoxLabel(toolUsage.tool, t)
    }
  })

  const documentActivityLineDataSets = filteredDocumentActivities.map(documentActivity => {
    return {
      labels: filteredDocumentActivities.map(activity => getFooterCheckBoxLabel(activity.documentActivity, t)),
      data: documentActivity.activities.map(activity => {
        return {x: activity.time, y: activity.numOpenDocuments}
      }),
      showLine: true,
      borderColor: colors.get(documentActivity.documentActivity),
      label: getFooterCheckBoxLabel(documentActivity.documentActivity, t)
    }
  })

  const lineConfig: ChartConfiguration = {
    type: "scatter",
    data: {
      datasets: showToolUsage ? toolUsageLineDataSets : documentActivityLineDataSets
    },
    options: {
      ...defaultOptions(endTime, {min: 0, max: participantCount}),
      plugins: {
        ...defaultOptions(endTime).plugins,
        tooltip: {
          displayColors: false,
          callbacks: {
            title: tooltipItem => tooltipItem[0].label,
            label: tooltipItem =>
              t("activity_tool_usage__tooltip_participants", {participantCount: tooltipItem.formattedValue})
          }
        }
      },
      scales: {
        ...defaultOptions(endTime, {min: 0, max: participantCount}).scales,
        yAxes: {
          min: 0,
          max: participantCount,
          ticks: {
            callback: (value, index, values) => {
              if (
                Number.isInteger(value) &&
                (index === 0 || index === values.length - 1 || index === values.length / 2 - 1)
              ) {
                return value
              }
              return ""
            }
          },
          grid: {
            display: false
          }
        }
      }
    }
  }

  const barDataToolUsage: ChartData = {
    labels: filteredToolUsages.map(tool => getFooterCheckBoxLabel(tool.tool, t)),
    datasets: [
      {
        data: filteredToolUsages.map(tool => tool.totalUsage),
        backgroundColor: filteredToolUsages.map(tool => colors.get(tool.tool)),
        borderWidth: 1
      }
    ]
  }

  const barDataDocumentActivity: ChartData = {
    labels: filteredDocumentActivities.map(document => getFooterCheckBoxLabel(document.documentActivity, t)),
    datasets: [
      {
        data: filteredDocumentActivities.map(document => document.totalActivity),
        backgroundColor: filteredDocumentActivities.map(document => colors.get(document.documentActivity)),
        borderWidth: 1
      }
    ]
  }

  const toolUsageBarConfig: ChartConfiguration = {
    type: "bar",
    data: showToolUsage ? barDataToolUsage : barDataDocumentActivity,
    options: {
      ...defaultOptions(endTime),
      plugins: {
        ...defaultOptions(endTime).plugins,
        tooltip: {
          displayColors: false,
          callbacks: {
            title: tooltipItem => tooltipItem[0].label,
            label: tooltipItem => convertSecondsToTimeString(tooltipItem.raw as number)
          }
        }
      },
      indexAxis: "y"
    }
  }

  return (
    <AllParticipantsActivityOverview
      endTime={endTime}
      surveyEvents={surveyEvents}
      onClose={onClose}
      diagramType={diagramType}
      onDiagramTypeChange={setDiagramType}
      displayWindows={displayWindows}
      setDisplayWindows={setDisplayWindows}
      participantCount={participantCount}
      displayDocuments={displayDocuments}
      showToolUsage={showToolUsage}
      setDisplayDocuments={setDisplayDocuments}
      setShowToolUsage={setShowToolUsage}
      barChartConfig={toolUsageBarConfig}
      lineChartConfig={lineConfig}
      allToolUsages={allToolUsages}
      loading={scenarioDocumentsLoading}
      documentActivityTotalTime={allDocumentActivities.map(documentActivity => {
        return {
          relevance: documentActivity.documentActivity,
          totalTime: allDocumentActivities.find(activity => activity === documentActivity)?.totalActivity ?? 0
        }
      })}
    />
  )
}
