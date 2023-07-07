import {combineReducers, Reducer} from "redux"
import {AppAction} from "../../actions/app-action"
import {ScenariosState} from "../../state/ui/scenarios-state"
import {directoriesAndFilesReducer} from "./scenarios/directories-and-files-reducer"

export const scenariosReducer: Reducer<ScenariosState, AppAction> = combineReducers({
  directoriesAndFiles: directoriesAndFilesReducer
})
