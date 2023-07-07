import {Payload} from "redux-first-router"
import {Route as SharedRoute} from "shared/routes"
import {Route} from "../../routes"

export type NavigationAction = NavigateToRouteAction

interface NavigateToRouteAction {
  readonly type: Route | SharedRoute
  readonly payload?: Payload
}

export const navigateToRouteAction = (route: Route | SharedRoute, payload?: Payload): NavigateToRouteAction => ({
  type: route,
  payload
})
