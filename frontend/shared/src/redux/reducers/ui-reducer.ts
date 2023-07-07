import {Reducer} from "redux"
import {SharedAppAction, UiActionType} from "../actions"
import {ProjectResumptionActionType} from "../actions/project-resumption-action"
import {initialUiState, UiState} from "../state"
import {binaryViewerReducer} from "./ui/binary-viewer-reducer"
import {commonReducer} from "./ui/common-reducer"
import {filesAndDirectoriesReducer} from "./ui/files-and-directories-reducer"
import {scheduledQuestionnairesReducer} from "./ui/scheduled-questionnaires-reducer"
import {spreadsheetViewerReducer} from "./ui/spreadsheet-viewer-reducer"
import {textDocumentViewerReducer} from "./ui/text-document-viewer-reducer"
import {windowManagerReducer} from "./ui/window-manager-reducer"

export const uiReducer: Reducer<UiState, SharedAppAction> = (state = initialUiState, action): UiState => {
  switch (action.type) {
    case UiActionType.ResetUiStateAction:
      return initialUiState
    case ProjectResumptionActionType.InitializeAppState:
      return action.state.ui
    default:
      return {
        ...state,
        binaryViewer: binaryViewerReducer(state.binaryViewer, action),
        spreadsheetViewer: spreadsheetViewerReducer(state.spreadsheetViewer, action),
        common: commonReducer(state.common, action),
        filesAndDirectories: filesAndDirectoriesReducer(state.filesAndDirectories, action),
        windowManager: windowManagerReducer(state.windowManager, state.binaryViewer, state.spreadsheetViewer, action),
        scheduledQuestionnaires: scheduledQuestionnairesReducer(state.scheduledQuestionnaires, action),
        textDocumentViewer: textDocumentViewerReducer(state.textDocumentViewer, action)
      }
  }
}
