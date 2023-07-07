import {Reducer} from "redux"
import {AppAction} from "../../actions/app-action"
import {CommonUiActionType} from "../../actions/ui/common-ui-action"
import {CommonUiState, initialCommonUiState} from "../../state/ui/common-ui-state"

export const commonUiReducer: Reducer<CommonUiState, AppAction> = (state = initialCommonUiState, action) => {
  switch (action.type) {
    case CommonUiActionType.UpdateAppMode:
      return {
        ...state,
        appMode: action.payload.mode
      }
    case CommonUiActionType.UpdateEntitySortingAndFilters:
      return {
        ...state,
        entityFilters: {
          ...state.entityFilters,
          [action.payload.configKey]: {
            ...state.entityFilters[action.payload.configKey],
            ...action.payload.config
          }
        }
      }
    case CommonUiActionType.UpdateNotification:
      return {...state, notification: action.payload.notification}
    case CommonUiActionType.UpdateChatVisibility:
      return {...state, isChatOpen: action.payload.isVisible}
    default:
      return state
  }
}
