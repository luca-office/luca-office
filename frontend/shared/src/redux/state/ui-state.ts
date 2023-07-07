import {
  BinaryViewerState,
  FilesAndDirectoriesState,
  initialBinaryViewerState,
  initialFilesAndDirectoriesState,
  initialScheduledQuestionnaireState,
  initialWindowManagerState,
  ScheduledQuestionnairesState,
  WindowManagerState
} from "./ui"
import {CommonUiState, initialCommonUiState} from "./ui/common-ui-state"
import {initialSpreadsheetViewerState, SpreadsheetViewerState} from "./ui/spreadsheet-viewer-state"
import {initialTextDocumentViewerState, TextDocumentViewerState} from "./ui/text-document-viewer-state"

export interface UiState {
  readonly binaryViewer: BinaryViewerState
  readonly spreadsheetViewer: SpreadsheetViewerState
  readonly common: CommonUiState
  readonly filesAndDirectories: FilesAndDirectoriesState
  readonly windowManager: WindowManagerState
  readonly scheduledQuestionnaires: ScheduledQuestionnairesState
  readonly textDocumentViewer: TextDocumentViewerState
}

export const initialUiState: UiState = {
  binaryViewer: initialBinaryViewerState,
  spreadsheetViewer: initialSpreadsheetViewerState,
  common: initialCommonUiState,
  filesAndDirectories: initialFilesAndDirectoriesState,
  windowManager: initialWindowManagerState,
  scheduledQuestionnaires: initialScheduledQuestionnaireState,
  textDocumentViewer: initialTextDocumentViewerState
}
