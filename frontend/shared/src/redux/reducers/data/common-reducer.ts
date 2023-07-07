import {Reducer} from "redux"
import {Option} from "../../../utils"
import {SharedAppAction} from "../../actions/app-action"
import {DataActionType} from "../../actions/data-action"
import {CommonDataState, initialCommonDataState} from "../../state/data"

export const commonReducer: Reducer<CommonDataState, SharedAppAction> = (
  state = initialCommonDataState,
  action
): CommonDataState => {
  switch (action.type) {
    case DataActionType.UpdateOfficeModules:
      return {
        ...state,
        officeModules: action.payload.modules
      }
    case DataActionType.UpdateParticipantData:
      return {
        ...state,
        participantData: Option.of(action.payload.participantData)
      }
    case DataActionType.UpdateLatestStartedProjectModule:
      return {
        ...state,
        latestStartedProjectModule: action.payload.latestStartedProjectModule
      }

    default:
      return state
  }
}
