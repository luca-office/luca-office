import {Reducer} from "redux"
import {AppAction} from "../actions/app-action"
import {UiActionType} from "../actions/ui-action"
import {initialUiState, UiState} from "../state/ui-state"
import {commonUiReducer} from "./ui/common-ui-reducer"
import {projectsReducer} from "./ui/projects-reducer"
import {scenariosReducer} from "./ui/scenarios-reducer"
import {synchronSurveyReducer} from "./ui/synchron-survey-reducer"

export const uiReducer: Reducer<UiState, AppAction> = (state = initialUiState, action) => {
  switch (action.type) {
    case UiActionType.ResetApplication:
      return initialUiState

    default:
      return {
        common: commonUiReducer(state.common, action),
        projects: projectsReducer(state.projects, action),
        scenarios: scenariosReducer(state.scenarios, action),
        synchronSurvey: synchronSurveyReducer(state.synchronSurvey, action)
      }
  }
}
