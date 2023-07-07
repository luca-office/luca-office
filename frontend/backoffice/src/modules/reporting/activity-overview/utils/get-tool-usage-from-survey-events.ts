import {BinaryViewerTool, OfficeTool, OfficeWindowType} from "shared/enums"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {SurveyEvent} from "shared/models"
import {convertMillisecondsToSeconds, Option} from "shared/utils"

export interface ToolUsage {
  readonly tool: OfficeWindowType
  readonly usages: {opened: number; closed: number}[]
  readonly totalUsage: number
}

export const getToolUsageFromSurveyEvents = (surveyEvents: SurveyEvent[]): Option<ToolUsage[]> => {
  const toolUsages: ToolUsage[] = [
    {tool: OfficeTool.Calculator, usages: [], totalUsage: 0},
    {tool: OfficeTool.EmailClient, usages: [], totalUsage: 0},
    {tool: OfficeTool.Notes, usages: [], totalUsage: 0},
    {tool: OfficeTool.FileBrowser, usages: [], totalUsage: 0},
    {tool: OfficeTool.ReferenceBookViewer, usages: [], totalUsage: 0},
    {tool: OfficeTool.Erp, usages: [], totalUsage: 0},
    {tool: BinaryViewerTool.SpreadsheetEditor, usages: [], totalUsage: 0},
    {tool: BinaryViewerTool.TextEditor, usages: [], totalUsage: 0},
    {tool: BinaryViewerTool.PDFViewer, usages: [], totalUsage: 0},
    {tool: BinaryViewerTool.ImageViewer, usages: [], totalUsage: 0},
    {tool: BinaryViewerTool.VideoPlayer, usages: [], totalUsage: 0}
  ]

  let openTools: OfficeWindowType[] = []

  let activeTool: OfficeWindowType | undefined = undefined

  const startEvent = surveyEvents.find(event => event.eventType === SurveyEventType.StartScenario)
  if (startEvent === undefined) return Option.none()

  const scenarioStartTime = startEvent.timestamp.getTime()

  let startTime: number | undefined = undefined

  const scenarioFinished = surveyEvents.find(event => event.eventType === SurveyEventType.EndScenario) !== undefined

  surveyEvents.map((event, i) => {
    const eventTime = getSurveyEventTime(event, scenarioStartTime)
    switch (event.eventType) {
      case SurveyEventType.OpenTool:
      case SurveyEventType.RestoreTool:
        if (activeTool !== undefined) {
          toolUsages.forEach(tool => {
            if (tool.tool === activeTool && startTime !== undefined) {
              tool.usages.push({
                opened: convertMillisecondsToSeconds(startTime),
                closed: convertMillisecondsToSeconds(eventTime)
              })
              openTools.push(tool.tool)
            }
          })
        }
        activeTool = event.data?.tool as OfficeWindowType
        startTime = eventTime
        openTools = openTools.filter(tool => tool !== activeTool)
        break

      case SurveyEventType.CloseTool:
      case SurveyEventType.MinimizeTool: {
        const closingTool = event.data?.tool as OfficeWindowType
        openTools = openTools.filter(tool => tool !== closingTool)
        toolUsages.forEach(tool => {
          if (tool.tool === activeTool && tool.tool === closingTool && startTime !== undefined) {
            tool.usages.push({
              opened: convertMillisecondsToSeconds(startTime),
              closed: convertMillisecondsToSeconds(eventTime)
            })
          }
        })
        if (closingTool === activeTool) {
          if (openTools.length > 0) {
            activeTool = openTools.pop()
            startTime = eventTime
          } else {
            activeTool = undefined
            startTime = undefined
          }
        }
        break
      }

      case SurveyEventType.EndScenario:
        toolUsages.forEach(tool => {
          if (tool.tool === activeTool && startTime !== undefined) {
            tool.usages.push({
              opened: convertMillisecondsToSeconds(startTime),
              closed: convertMillisecondsToSeconds(eventTime)
            })
          }
        })
        break
    }

    if (i === surveyEvents.length - 1 && !scenarioFinished) {
      toolUsages.forEach(tool => {
        if (tool.tool === activeTool && startTime !== undefined) {
          tool.usages.push({
            opened: convertMillisecondsToSeconds(startTime),
            closed: convertMillisecondsToSeconds(eventTime)
          })
        }
      })
    }
  })
  return Option.of(
    toolUsages.map(tool => {
      return {...tool, totalUsage: getTotalUsage(tool.usages)}
    })
  )
}

export const getSurveyEventTime = (surveyEvent: SurveyEvent, scenarioStartTime: number) =>
  surveyEvent.timestamp.getTime() - scenarioStartTime

export const getTotalUsage = (usages: {opened: number; closed: number}[]): number =>
  usages.reduce((acc, usage) => acc + usage.closed - usage.opened, 0)
