import {SharedAppAction} from "shared/redux/actions"
import {SharedAppState} from "shared/redux/state"
import {InitDependentOfficeTool} from "../state/player-preview-state"

export enum PreviewActionType {
  AddTimeoutId = "preview-action-add-timeout-id",
  ClearTimeoutIds = "preview-action-clear-timeout-ids",
  ResetPreview = "preview-action-reset-preview",
  ResetPreviewWithoutTools = "preview-action-reset-preview-without-tools",
  InitializeState = "preview-action-initialize-state",
  ToolInitialized = "preview-action-tool-initialized"
}

export type PreviewAction =
  | {
      type: PreviewActionType.AddTimeoutId
      id: number
    }
  | {
      type: PreviewActionType.ClearTimeoutIds
    }
  | {
      type: PreviewActionType.ResetPreview
    }
  | {
      type: PreviewActionType.ResetPreviewWithoutTools
    }
  | {
      type: PreviewActionType.InitializeState
      state: SharedAppState
    }
  | {
      type: PreviewActionType.ToolInitialized
      dependency: InitDependentOfficeTool
    }
  | SharedAppAction

export const addTimeoutId = (id: number): PreviewAction => ({type: PreviewActionType.AddTimeoutId, id})

export const clearTimeoutIds = (): PreviewAction => ({type: PreviewActionType.ClearTimeoutIds})

export const resetPreview = (): PreviewAction => ({type: PreviewActionType.ResetPreview})

export const resetPreviewWithoutTools = (): PreviewAction => ({type: PreviewActionType.ResetPreviewWithoutTools})

export const initializeState = (state: SharedAppState): PreviewAction => ({
  type: PreviewActionType.InitializeState,
  state
})

export const dependencyInitialized = (dependency: InitDependentOfficeTool): PreviewAction => ({
  type: PreviewActionType.ToolInitialized,
  dependency
})
