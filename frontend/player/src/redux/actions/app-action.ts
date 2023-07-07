import {SharedAppAction} from "shared/redux/actions/app-action"
import {RoutingAction} from "./routing-action"

export type AppAction = SharedAppAction | RoutingAction
