import {Reducer} from "redux"
import {AppAction} from "../../actions/app-action"
import {SynchronSurveyActionType} from "../../actions/ui/synchron-survey-action"
import {initialSynchronSurveyState, SynchronSurveyState} from "../../state/ui/synchron-survey-state"

export const synchronSurveyReducer: Reducer<SynchronSurveyState, AppAction> = (
  state = initialSynchronSurveyState,
  action
) => {
  switch (action.type) {
    case SynchronSurveyActionType.SetActiveModule:
      return {
        ...state,
        activeModule: action.projectModule.map(module => ({
          ...module,
          startedAt: action.startedAt
        }))
      }
    case SynchronSurveyActionType.SetActiveModuleIndex:
      return {
        ...state,
        activeModuleIndex: action.moduleIndex
      }
    default:
      return state
  }
}
