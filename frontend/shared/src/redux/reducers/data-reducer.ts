import {Reducer} from "redux"
import {DataActionType} from "../actions"
import {SharedAppAction} from "../actions/app-action"
import {ProjectResumptionActionType} from "../actions/project-resumption-action"
import {DataState, initialDataState} from "../state/data-state"
import {chatReducer} from "./data/chat-reducer"
import {commonReducer} from "./data/common-reducer"
import {emailsReducer} from "./data/emails-reducer"
import {notesReducer} from "./data/notes-reducer"
import {projectResumptionReducer} from "./data/project-resumption-reducer"
import {spreadsheetReducer} from "./data/spreadsheet-reducer"
import {surveyEventsReducer} from "./data/survey-events-reducer"
import {surveyInvitationReducer} from "./data/survey-invitation-reducer"
import {textDocumentReducer} from "./data/text-document-reducer"

export const dataReducer: Reducer<DataState, SharedAppAction> = (state = initialDataState, action) => {
  switch (action.type) {
    case DataActionType.ResetDataState:
      return {
        ...initialDataState,
        surveyInvitation: state.surveyInvitation
      }
    case ProjectResumptionActionType.InitializeAppState:
      return action.state.data
    default:
      return {
        common: commonReducer(state.common, action),
        emails: emailsReducer(state.emails, action),
        surveyInvitation: surveyInvitationReducer(state.surveyInvitation, action),
        surveyEvents: surveyEventsReducer(state.surveyEvents, action),
        spreadsheets: spreadsheetReducer(state.spreadsheets, action),
        notes: notesReducer(state.notes, action),
        textDocuments: textDocumentReducer(state.textDocuments, action),
        chat: chatReducer(state.chat, action),
        projectResumption: projectResumptionReducer(state.projectResumption, action)
      }
  }
}
