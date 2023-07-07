import {combineReducers} from "redux"
import {dataReducer} from "shared/redux/reducers/data-reducer"
import {uiReducer} from "shared/redux/reducers/ui-reducer"
import {routingReducer} from "./routing-reducer"

export const appReducer = combineReducers({routing: routingReducer, data: dataReducer, ui: uiReducer})
