import {RouteItem, RouteItemBase} from "../../routes"

export type RoutingAction = NavigateToRouteAction

export enum RoutingActionType {
  UpdateActiveRoute = "UpdateActiveRoute"
}

interface NavigateToRouteLegacyAction {
  readonly type: RoutingActionType.UpdateActiveRoute
  readonly payload: RouteItemBase
}

export const navigateToRouteLegacyAction = (route: RouteItemBase): NavigateToRouteLegacyAction => ({
  type: RoutingActionType.UpdateActiveRoute,
  payload: route
})

interface NavigateToRouteAction {
  readonly type: RoutingActionType.UpdateActiveRoute
  readonly payload: RouteItem
}

export const navigateToRouteAction = (route: RouteItem): NavigateToRouteAction => ({
  type: RoutingActionType.UpdateActiveRoute,
  payload: route
})
