import {round, sortBy} from "lodash-es"
import {BinaryViewerTool, OfficeTool, OfficeWindowType} from "shared/enums"
import {ToolUsage} from "./get-tool-usage-from-survey-events"

export enum UsageEvent {
  OpenEvent = "OpenEvent",
  CloseEvent = "CloseEvent"
}

export interface UsagesAllParticipants {
  time: number
  numOpenWindows: number
}

export interface AllToolUsage {
  readonly tool: OfficeWindowType
  readonly usages: UsagesAllParticipants[]
  readonly totalUsage: number
}

type ToolUsages = Map<OfficeWindowType, ToolUsage>

type ParticipantToolUsages = Array<ToolUsages>

export const getToolUsageForAllParticipants = (toolUsagesAllParticipants: ParticipantToolUsages): AllToolUsage[] => {
  const allToolUsages: ToolUsage[] = [
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

  return allToolUsages.map(toolUsage => {
    const toolUsages: {time: number; type: UsageEvent}[] = []
    toolUsagesAllParticipants.forEach(participant => {
      participant.get(toolUsage.tool)?.usages.forEach(usage => {
        toolUsages.push({time: usage.opened, type: UsageEvent.OpenEvent})
        toolUsages.push({time: usage.closed, type: UsageEvent.CloseEvent})
      })
    })

    const sortedToolUsages = sortBy(toolUsages, "time")

    const numOpenWindows = [{time: 0, numOpenWindows: 0}]
    sortedToolUsages.forEach((usage, i) => {
      numOpenWindows.push({
        time: usage.time,
        numOpenWindows:
          usage.type === UsageEvent.OpenEvent
            ? numOpenWindows[i].numOpenWindows + 1
            : numOpenWindows[i].numOpenWindows - 1
      })
    })

    return {
      tool: toolUsage.tool,
      usages: numOpenWindows,
      totalUsage: round(
        toolUsagesAllParticipants
          .map(participant => participant.get(toolUsage.tool))
          .reduce((acc, totalUsage) => acc + (totalUsage?.totalUsage ?? 0) / toolUsagesAllParticipants.length, 0),
        0
      )
    }
  })
}
