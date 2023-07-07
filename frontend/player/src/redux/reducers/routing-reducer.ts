import {Reducer} from "redux"
import {AppAction} from "../actions/app-action"
import {RoutingActionType} from "../actions/routing-action"
import {initialRoutingState, RoutingState} from "../state/routing-state"

export const routingReducer: Reducer<RoutingState, AppAction> = (state = initialRoutingState(null), action) => {
  switch (action.type) {
    case RoutingActionType.UpdateActiveRoute:
      return {
        activeRoute: action.payload.routeType,
        parameters: action.payload.parameters
      }
    default:
      return state
  }
}
