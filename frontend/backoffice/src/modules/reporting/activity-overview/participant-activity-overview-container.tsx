import {ChartConfiguration, ChartData} from "chart.js"
import {flatten} from "lodash-es"
import React from "react"
import {SurveyEvent} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {convertSecondsToTimeString} from "shared/utils"
import {useScenarioDocuments} from "../../../graphql/hooks/queries/reporting/use-scenario-documents"
import {ParticipantActivityOverview} from "./participant-activity-overview"
import {
  allDisplayWindows,
  allDocumentActivity,
  colors,
  defaultOptions,
  DocumentActivity
} from "./utils/acitvity-overview-config"
import {getCurrentScenarioTime} from "./utils/get-current-scenario-time"
import {getDocumentActivityFromSurveyEvents} from "./utils/get-document-activity-from-survey-events"
import {getFooterCheckBoxLabel} from "./utils/get-footer-check-box-label"
import {getToolUsageFromSurveyEvents, getTotalUsage} from "./utils/get-tool-usage-from-survey-events"

export interface ParticipantActivityOverviewContainerProps {
  readonly surveyEvents: SurveyEvent[]
  readonly endTime: number
  readonly onClose: () => void
  readonly participantName: string
  readonly scenarioId: UUID
}

export enum Diagram {
  ScatterDiagram = "ScatterDiagram",
  BarDiagram = "BarDiagram"
}

export const ParticipantActivityOverviewContainer: React.FC<ParticipantActivityOverviewContainerProps> = ({
  surveyEvents,
  endTime,
  onClose,
  participantName,
  scenarioId
}) => {
  const {t} = useLucaTranslation()

  const {scenarioDocuments, scenarioDocumentsLoading} = useScenarioDocuments(scenarioId)

  const [diagramType, setDiagramType] = React.useState(Diagram.ScatterDiagram)
  const [displayWindows, setDisplayWindows] = React.useState(allDisplayWindows)
  const [displayDocumentActivities, setDisplayDocumentActivities] = React.useState(allDocumentActivity)
  const [showToolUsage, setShowToolUsage] = React.useState(true)

  const documentActivities = scenarioDocuments.flatMap(scenarioDocuments =>
    getDocumentActivityFromSurveyEvents(surveyEvents, scenarioDocuments)
  )
  const documentActivitiesTotalTime = documentActivities
    .map(documentActivities =>
      displayDocumentActivities.map(documentActivity => {
        return {
          relevance: documentActivity,
          totalTime: getTotalUsage(
            documentActivity === DocumentActivity.RequiredDocuments
              ? documentActivities.required
              : documentActivity === DocumentActivity.Inactivity
              ? documentActivities.inactive
              : documentActivities.irrelevant
          )
        }
      })
    )
    .getOrElse([])

  const toolUsages = getToolUsageFromSurveyEvents(surveyEvents)

  const defaultOffset = 10
  const shift = 5

  const documentActivityPulseConfig = documentActivities.map(documentActivities => {
    const data: ChartData = {
      labels: displayDocumentActivities.map(document => getFooterCheckBoxLabel(document, t)),
      datasets: displayDocumentActivities.map(document => {
        const dataPoints: {x: number; y: number}[] = []
        switch (document) {
          case DocumentActivity.Inactivity:
            documentActivities.inactive.map(document => {
              const offset = defaultOffset
              const startLow = {y: offset - shift, x: document.opened}
              const startHigh = {y: offset, x: document.opened}
              const endHigh = {y: offset, x: document.closed}
              const endLow = {y: offset - shift, x: document.closed}
              dataPoints.push(...[startLow, startHigh, endHigh, endLow])
            })
            break
          case DocumentActivity.IrrelevantDocuments:
            documentActivities.irrelevant.map(document => {
              const offset = defaultOffset * 2
              const startLow = {y: offset - shift, x: document.opened}
              const startHigh = {y: offset, x: document.opened}
              const endHigh = {y: offset, x: document.closed}
              const endLow = {y: offset - shift, x: document.closed}
              dataPoints.push(...[startLow, startHigh, endHigh, endLow])
            })
            break
          case DocumentActivity.RequiredDocuments:
            documentActivities.required.map(document => {
              const offset = defaultOffset * 3
              const startLow = {y: offset - shift, x: document.opened}
              const startHigh = {y: offset, x: document.opened}
              const endHigh = {y: offset, x: document.closed}
              const endLow = {y: offset - shift, x: document.closed}
              dataPoints.push(...[startLow, startHigh, endHigh, endLow])
            })
            break
        }
        if (document !== DocumentActivity.Inactivity) {
          const offset = document === DocumentActivity.RequiredDocuments ? 3 * defaultOffset : 2 * defaultOffset
          dataPoints.unshift({x: 0, y: offset - shift})
          dataPoints.push({x: getCurrentScenarioTime(surveyEvents), y: offset - shift})
        }

        return {
          data: dataPoints,
          showLine: true,
          pointRadius: 0,
          borderColor: colors.get(document),
          label: getFooterCheckBoxLabel(document, t)
        }
      })
    }

    const config: ChartConfiguration = {
      type: "scatter",
      data: data,
      options: {
        ...defaultOptions(endTime),
        plugins: {
          ...defaultOptions(endTime).plugins,
          tooltip: {
            displayColors: false,
            callbacks: {
              label: tooltipItem => tooltipItem.dataset.label || ""
            }
          }
        },
        scales: {
          ...defaultOptions(endTime).scales,
          yAxes: {
            min: defaultOffset - shift - 1, //lowest possible point - 1
            max: defaultOffset * 3 + 1, //highest possible point + 1
            ticks: {
              display: false
            },
            grid: {
              display: false
            }
          }
        }
      }
    }
    return config
  })

  const toolUsagePulseConfig = toolUsages.map(toolUsages => {
    const toolUsagesPulse = toolUsages
      .filter(tool => displayWindows.includes(tool.tool))
      .map((tool, i) => {
        const offset = i * defaultOffset
        const usage = tool.usages.map(usage => {
          const startLow = {y: offset - shift, x: usage.opened}
          const startHigh = {y: offset, x: usage.opened}
          const endHigh = {y: offset, x: usage.closed}
          const endLow = {y: offset - shift, x: usage.closed}
          return [startLow, startHigh, endHigh, endLow]
        })
        usage.unshift([{x: 0, y: offset - shift}])
        usage.push([{x: getCurrentScenarioTime(surveyEvents), y: offset - shift}])
        return {...tool, usages: flatten(usage)}
      })

    const data: ChartData = {
      labels: toolUsagesPulse.map(tool => getFooterCheckBoxLabel(tool.tool, t)),
      datasets: toolUsagesPulse.map(tool => {
        return {
          data: tool.usages,
          showLine: true,
          pointRadius: 0,
          borderColor: colors.get(tool.tool),
          label: getFooterCheckBoxLabel(tool.tool, t)
        }
      })
    }

    const config: ChartConfiguration = {
      type: "scatter",
      data: data,
      options: {
        ...defaultOptions(endTime),
        plugins: {
          ...defaultOptions(endTime).plugins,
          tooltip: {
            displayColors: false,
            callbacks: {
              label: tooltipItem => tooltipItem.dataset.label || ""
            }
          }
        }
      }
    }
    return config
  })

  const documentActivityBarConfig = documentActivities.map(documentActivities => {
    const data: ChartData = {
      labels: displayDocumentActivities.map(document => getFooterCheckBoxLabel(document, t)),
      datasets: [
        {
          data: displayDocumentActivities.map(document => {
            switch (document) {
              case DocumentActivity.Inactivity:
                return getTotalUsage(documentActivities.inactive)
              case DocumentActivity.IrrelevantDocuments:
                return getTotalUsage(documentActivities.irrelevant)
              case DocumentActivity.RequiredDocuments:
                return getTotalUsage(documentActivities.required)
            }
          }),
          backgroundColor: displayDocumentActivities.map(document => colors.get(document)),
          borderWidth: 1
        }
      ]
    }

    const config: ChartConfiguration = {
      type: "bar",
      data: data,
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
    return config
  })

  const toolUsageBarConfig = toolUsages.map(toolUsages => {
    const filteredUsages = toolUsages.filter(tool => displayWindows.includes(tool.tool))
    const data: ChartData = {
      labels: filteredUsages.map(tool => tool.tool.toString()),
      datasets: [
        {
          data: filteredUsages.map(tool => tool.totalUsage),
          backgroundColor: filteredUsages.map(tool => colors.get(tool.tool)),
          borderWidth: 1
        }
      ]
    }

    const config: ChartConfiguration = {
      type: "bar",
      data: data,
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
    return config
  })

  return (
    <ParticipantActivityOverview
      endTime={endTime}
      surveyEvents={surveyEvents}
      participantName={participantName}
      onClose={onClose}
      diagramType={diagramType}
      onDiagramTypeChange={setDiagramType}
      displayWindows={displayWindows}
      setDisplayWindows={setDisplayWindows}
      showToolUsage={showToolUsage}
      setShowToolUsage={setShowToolUsage}
      displayDocuments={displayDocumentActivities}
      setDisplayDocuments={setDisplayDocumentActivities}
      toolUsages={toolUsages}
      lineChartConfig={showToolUsage ? toolUsagePulseConfig : documentActivityPulseConfig}
      barChartConfig={showToolUsage ? toolUsageBarConfig : documentActivityBarConfig}
      loading={scenarioDocumentsLoading}
      documentActivityTotalTime={documentActivitiesTotalTime}
    />
  )
}
