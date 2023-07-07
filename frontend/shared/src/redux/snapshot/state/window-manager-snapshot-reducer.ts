import {OfficeWindowType} from "../../../enums"
import {SurveyEventType} from "../../../graphql/generated/globalTypes"
import {SurveyEvent} from "../../../models"
import {SharedAppState} from "../../../redux/state"
import {WindowManagerState} from "../../../redux/state/ui"

export const windowManagerSnapshotReducer = (state: SharedAppState, surveyEvent: SurveyEvent): WindowManagerState => {
  const windowManager = state.ui.windowManager

  switch (surveyEvent.eventType) {
    case SurveyEventType.OpenTool: {
      const data = surveyEvent.data as {tool: OfficeWindowType}
      return {
        ...windowManager,
        openWindows: Array.from(new Set([...windowManager.openWindows, data.tool])),
        minimizedWindows: windowManager.minimizedWindows.filter(window => window !== data.tool)
      }
    }
    case SurveyEventType.RestoreTool: {
      const data = surveyEvent.data as {tool: OfficeWindowType}
      return {
        ...windowManager,
        minimizedWindows: windowManager.minimizedWindows.filter(window => window !== data.tool)
      }
    }
    case SurveyEventType.MinimizeTool: {
      const data = surveyEvent.data as {tool: OfficeWindowType}
      return {
        ...windowManager,
        minimizedWindows: windowManager.openWindows.some(window => window === data.tool)
          ? Array.from(new Set([...windowManager.minimizedWindows, data.tool]))
          : windowManager.minimizedWindows
      }
    }
    case SurveyEventType.CloseTool: {
      const data = surveyEvent.data as {tool: OfficeWindowType}
      return {
        ...windowManager,
        openWindows: windowManager.openWindows.filter(window => window !== data.tool),
        minimizedWindows: windowManager.minimizedWindows.filter(window => window !== data.tool)
      }
    }
    default:
      return windowManager
  }
}
