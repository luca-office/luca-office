import {Reducer} from "redux"
import {SharedAppAction} from "../../actions"
import {ProjectResumptionActionType} from "../../actions/project-resumption-action"
import {initialProjectResumptionState, ProjectResumptionState} from "../../state/data/project-resumption-state"

export const projectResumptionReducer: Reducer<ProjectResumptionState, SharedAppAction> = (
  state = initialProjectResumptionState,
  action
) => {
  switch (action.type) {
    case ProjectResumptionActionType.UpdateElapsedTimeOfProjectModule:
      return {
        ...state,
        elapsedTimeOfProjectModule: action.elapsedTimeOfProjectModule
      }
    case ProjectResumptionActionType.UpdateDelayedEmailsInitialized:
      return {
        ...state,
        areDelayedEmailsInitialized: action.emailsAreInitialized
      }
    case ProjectResumptionActionType.UpdateInterventionEmailsInitialized:
      return {
        ...state,
        areInterventionEmailsInitialized: action.interventionEmailsAreInitialized
      }
    case ProjectResumptionActionType.ResetProjectResumptionState:
      return initialProjectResumptionState
    default:
      return state
  }
}
