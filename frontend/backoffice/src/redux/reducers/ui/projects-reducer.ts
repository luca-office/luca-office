import {Reducer} from "redux"
import {Option} from "shared/utils"
import {AppAction} from "../../actions/app-action"
import {ProjectsActionType} from "../../actions/ui/projects-action"
import {initialProjectState, ProjectsState} from "../../state/ui/projects-state"

export const projectsReducer: Reducer<ProjectsState, AppAction> = (state = initialProjectState, action) => {
  switch (action.type) {
    case ProjectsActionType.ResetSelectedListTabIndex:
      return {
        ...state,
        selectedListTab: Option.none()
      }
    case ProjectsActionType.SelectListTabIndex:
      return {
        ...state,
        selectedListTab: action.payload
      }
    default:
      return state
  }
}
