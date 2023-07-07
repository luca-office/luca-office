import {BinaryViewerTool, OfficeWindowType} from "shared/enums"
import {getToolUsageForAllParticipants} from "../utils/get-tool-usage-for-all-participants"
import {getToolUsageFromSurveyEvents, ToolUsage} from "../utils/get-tool-usage-from-survey-events"
import {mockSurveyEvents} from "./mock-data"

describe("tool activity from survey events", () => {
  it("gets correct timeline", () => {
    const toolActivities = getToolUsageFromSurveyEvents(mockSurveyEvents)
    expect(
      toolActivities
        .map(toolActivities => toolActivities.find(tool => tool.tool === BinaryViewerTool.PDFViewer)?.totalUsage)
        .orNull()
    ).toEqual(60)
    const allToolActivities = getToolUsageForAllParticipants([
      new Map<OfficeWindowType, ToolUsage>(
        toolActivities
          .getOrElse([])
          .map(toolActivity => [toolActivity.tool, toolActivity] as [OfficeWindowType, ToolUsage])
      )
    ])
    expect(allToolActivities.find(tool => tool.tool === BinaryViewerTool.PDFViewer)?.totalUsage).toEqual(60)
  })
})
