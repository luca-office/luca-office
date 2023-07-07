import {OfficeTool} from "shared/enums"
import {initialSharedAppState, SharedAppState} from "shared/redux/state"

export type InitDependentOfficeTool =
  | OfficeTool.EmailClient
  | OfficeTool.FileBrowser
  | OfficeTool.ReferenceBookViewer
  | "taskbar"

export const initialInitializedToolState: Record<InitDependentOfficeTool, boolean> = {
  [OfficeTool.EmailClient]: false,
  [OfficeTool.FileBrowser]: false,
  [OfficeTool.ReferenceBookViewer]: false,
  taskbar: false
}

export const initialPlayerPreviewState: PlayerPreviewState = {
  player: initialSharedAppState,
  timeoutIds: [],
  initializedTools: initialInitializedToolState
}

export interface PlayerPreviewState {
  player: SharedAppState
  timeoutIds: Array<number>
  initializedTools: Record<InitDependentOfficeTool, boolean>
}
