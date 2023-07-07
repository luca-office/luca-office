import {Reducer} from "redux"
import {SharedAppAction} from "shared/redux/actions"
import {dataReducer as previewDataReducer, uiReducer as previewUiReducer} from "shared/redux/reducers"
import {initialSharedAppState, SharedAppState} from "shared/redux/state"
import {PreviewAction, PreviewActionType} from "../actions/player-preview-actions"
import {initialPlayerPreviewState, PlayerPreviewState} from "../state/player-preview-state"

export const playerPreviewReducer: Reducer<PlayerPreviewState, PreviewAction> = (
  state = initialPlayerPreviewState,
  action
) => {
  switch (action.type) {
    case PreviewActionType.AddTimeoutId:
      return {
        ...state,
        timeoutIds: [...state.timeoutIds, action.id]
      }
    case PreviewActionType.ClearTimeoutIds:
      return {
        ...state,
        timeoutIds: []
      }
    case PreviewActionType.ResetPreview:
      return initialPlayerPreviewState
    case PreviewActionType.ResetPreviewWithoutTools:
      return {
        ...state,
        player: initialSharedAppState,
        timeoutIds: []
      }
    case PreviewActionType.InitializeState:
      return {
        ...state,
        player: action.state
      }
    case PreviewActionType.ToolInitialized:
      return {
        ...state,
        initializedTools: {...state.initializedTools, [action.dependency]: true}
      }
    default:
      return {
        ...state,
        player: playerReducer(state.player, action)
      }
  }
}

const playerReducer: Reducer<SharedAppState, SharedAppAction> = (state = initialSharedAppState, action) => {
  return {
    data: previewDataReducer(state.data, action),
    ui: previewUiReducer(state.ui, action)
  }
}
