import {BinaryViewerTool, OfficeTool} from "../../../enums"
import {contains, last} from "../../../utils"
import {SharedAppAction} from "../../actions/app-action"
import {BinaryViewerActionType} from "../../actions/ui/binary-viewer-action"
import {SpreadsheetViewerActionType} from "../../actions/ui/spreadsheet-viewer-action"
import {TextDocumentViewerActionType} from "../../actions/ui/text-document-viewer-action"
import {WindowManagerActionType} from "../../actions/ui/window-manager-action"
import {
  BinaryViewerState,
  initialBinaryViewerState,
  initialWindowManagerState,
  WindowManagerState
} from "../../state/ui"
import {initialSpreadsheetViewerState, SpreadsheetViewerState} from "../../state/ui/spreadsheet-viewer-state"
import {mapViewerStateToType} from "../../utils/binary-viewer"

export const windowManagerReducer: (
  state: WindowManagerState,
  binaryViewerState: BinaryViewerState,
  spreadsheetViewerState: SpreadsheetViewerState,
  action: SharedAppAction
) => WindowManagerState = (
  state = initialWindowManagerState,
  binaryViewerState = initialBinaryViewerState,
  spreadsheetViewerState = initialSpreadsheetViewerState,
  action: SharedAppAction
): WindowManagerState => {
  switch (action.type) {
    case WindowManagerActionType.OpenWindow:
      return {
        ...state,
        minimizedWindows: state.minimizedWindows.filter(window => window !== action.payload.targetWindow),
        openWindows: [
          ...state.openWindows.filter(window => window !== action.payload.targetWindow),
          action.payload.targetWindow
        ],
        isChatVisible: action.payload.targetWindow === OfficeTool.Chat
      }

    case WindowManagerActionType.CloseWindow:
      return {
        ...state,
        minimizedWindows: state.minimizedWindows.filter(window => window !== action.payload.targetWindow),
        openWindows: state.openWindows.filter(window => window !== action.payload.targetWindow),
        isChatVisible: last(state.openWindows.filter(window => window !== action.payload.targetWindow)).exists(
          window => window === OfficeTool.Chat
        )
      }

    case WindowManagerActionType.MinimizeWindow: {
      const minimizedWindows = state.openWindows.some(window => window === action.payload.targetWindow)
        ? [
            ...state.minimizedWindows.filter(window => window !== action.payload.targetWindow),
            action.payload.targetWindow
          ]
        : state.minimizedWindows

      return {
        ...state,
        minimizedWindows,
        isChatVisible:
          last(state.openWindows).exists(window => window === OfficeTool.Chat) &&
          !contains(OfficeTool.Chat, minimizedWindows)
      }
    }

    case WindowManagerActionType.CloseAllWindows:
      return initialWindowManagerState

    case BinaryViewerActionType.OpenBinary:
      // eslint-disable-next-line no-case-declarations
      const openedTool = mapViewerStateToType(action.payload.viewerType)
      return {
        ...state,
        // image will be opened - update windows accordingly (maximize and open/focus viewer)
        minimizedWindows: state.minimizedWindows.filter(window => window !== openedTool),
        openWindows: [...state.openWindows.filter(window => window !== openedTool), openedTool]
      }

    case BinaryViewerActionType.CloseBinary:
      // eslint-disable-next-line no-case-declarations
      const closedTool = mapViewerStateToType(action.payload.viewerType)
      // eslint-disable-next-line no-case-declarations
      const shouldCloseViewer = !binaryViewerState[action.payload.viewerType].openBinaries.filter(
        binary => binary.id !== action.payload.binaryId
      ).length

      return {
        ...state,
        // close image viewer for last binary
        minimizedWindows: shouldCloseViewer
          ? state.minimizedWindows.filter(window => window !== closedTool)
          : state.minimizedWindows,
        openWindows: shouldCloseViewer ? state.openWindows.filter(window => window !== closedTool) : state.openWindows
      }

    case SpreadsheetViewerActionType.OpenSpreadsheet:
      return {
        ...state,
        // spreadsheet will be opened - update windows accordingly (maximize and open/focus viewer)
        minimizedWindows: state.minimizedWindows.filter(window => window !== BinaryViewerTool.SpreadsheetEditor),
        openWindows: [
          ...state.openWindows.filter(window => window !== BinaryViewerTool.SpreadsheetEditor),
          BinaryViewerTool.SpreadsheetEditor
        ]
      }

    case SpreadsheetViewerActionType.CloseSpreadsheet: {
      const shouldCloseViewer = !spreadsheetViewerState.openSpreadsheets.filter(
        spreadsheet => spreadsheet.id !== action.payload.spreadsheetId
      ).length
      return {
        ...state,
        // close viewer for last spreadsheet
        minimizedWindows: shouldCloseViewer
          ? state.minimizedWindows.filter(window => window !== BinaryViewerTool.SpreadsheetEditor)
          : state.minimizedWindows,
        openWindows: shouldCloseViewer
          ? state.openWindows.filter(window => window !== BinaryViewerTool.SpreadsheetEditor)
          : state.openWindows
      }
    }

    case TextDocumentViewerActionType.OpenTextDocument:
      return {
        ...state,
        minimizedWindows: state.minimizedWindows.filter(window => window !== BinaryViewerTool.TextEditor),
        openWindows: [
          ...state.openWindows.filter(window => window !== BinaryViewerTool.TextEditor),
          BinaryViewerTool.TextEditor
        ]
      }

    case TextDocumentViewerActionType.CloseTextDocument:
      return {
        ...state,
        minimizedWindows: state.minimizedWindows.filter(window => window !== BinaryViewerTool.TextEditor),
        openWindows: state.openWindows.filter(window => window !== BinaryViewerTool.TextEditor)
      }

    case WindowManagerActionType.UpdateAvailableWindows:
      return {
        ...state,
        availableWindows: action.payload.availableWindows
      }

    case WindowManagerActionType.SetChatWindowVisibility:
      return {
        ...state,
        isChatVisible: action.payload.visible
      }

    default:
      return state
  }
}
