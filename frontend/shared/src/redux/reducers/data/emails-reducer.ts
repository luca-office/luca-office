import {Reducer} from "redux"
import {SharedAppAction} from "../../actions/app-action"
import {DataActionType} from "../../actions/data-action"
import {EmailsState, initialEmailsState} from "../../state/data"

export const emailsReducer: Reducer<EmailsState, SharedAppAction> = (state = initialEmailsState, action) => {
  switch (action.type) {
    case DataActionType.SetEmails:
      return action.payload.emails
    case DataActionType.AddEmail:
      return [...state.filter(email => email.id !== action.payload.email.id), action.payload.email]
    case DataActionType.CreateEmail:
      return [...state, action.payload.email]
    case DataActionType.UpdateEmail:
      return state.map(email => (email.id === action.payload.email.id ? action.payload.email : email))
    case DataActionType.DeleteEmail:
      return state.filter(email => email.id !== action.payload.id)
    case DataActionType.MoveEmailToDirectory:
      return state.map(email => (email.id === action.payload.id ? {...email, directory: action.payload.dir} : email))
    case DataActionType.ResetEmails:
      return initialEmailsState
    default:
      return state
  }
}
