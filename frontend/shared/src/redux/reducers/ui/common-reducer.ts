import {Reducer} from "redux"
import {now, Option} from "../../../utils"
import {SharedAppAction} from "../../actions/app-action"
import {UiActionType} from "../../actions/ui-action"
import {CommonUiState, initialCommonUiState} from "../../state/ui/common-ui-state"

export const commonReducer: Reducer<CommonUiState, SharedAppAction> = (
  state = initialCommonUiState,
  action
): CommonUiState => {
  switch (action.type) {
    case UiActionType.UpdateNotification:
      return {...state, notification: action.payload.notification}
    case UiActionType.UpdateActiveModule:
      return {...state, activeModule: action.payload.activeModule, activeModuleStartTime: Option.of(now())}
    case UiActionType.UpdateSelectedReferenceElementId:
      return {...state, selectedReferenceElementId: action.payload.selectedReferenceElementId}

    default:
      return state
  }
}
