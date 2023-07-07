import {SurveyEvent} from "../../../models"
import {SharedAppState, UiState} from "../../../redux/state"
import {binaryViewerSnapshotReducer} from "./binary-viewer-snapshot-reducer"
import {commonUiSnapshotReducer} from "./common-ui-snapshot-reducer"
import {filesAndDirectoriesSnapshotReducer} from "./files-and-directories-snapshot-reducer"
import {spreadsheetViewerSnapshotReducer} from "./spreadsheet-viewer-snapshot-reducer"
import {textDocumentViewerSnapshotReducer} from "./text-document-viewer-snapshot-reducer"
import {windowManagerSnapshotReducer} from "./window-manager-snapshot-reducer"

export const uiSnapshotReducer = (state: SharedAppState, surveyEvent: SurveyEvent): UiState => {
  return {
    ...state.ui,
    binaryViewer: binaryViewerSnapshotReducer(state, surveyEvent),
    filesAndDirectories: filesAndDirectoriesSnapshotReducer(state, surveyEvent),
    common: commonUiSnapshotReducer(state, surveyEvent),
    windowManager: windowManagerSnapshotReducer(state, surveyEvent),
    spreadsheetViewer: spreadsheetViewerSnapshotReducer(state, surveyEvent),
    textDocumentViewer: textDocumentViewerSnapshotReducer(state, surveyEvent)
  }
}
