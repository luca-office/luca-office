import {SurveyEvent} from "../../../models"
import {DataState, SharedAppState} from "../../../redux/state"
import {chatSnapshotReducer} from "./chat-snapshot-reducer"
import {commonDataSnapshotReducer} from "./common-data-snapshot-reducer"
import {emailsSnapshotReducer} from "./emails-snapshot-reducer"
import {notesSnapshotReducer} from "./notes-snapshot-reducer"
import {spreadsheetsSnapshotReducer} from "./spreadsheets-snapshot-reducer"
import {textDocumentsSnapshotReducer} from "./text-documents-snapshot-reducer"

export const dataSnapshotReducer = (state: SharedAppState, surveyEvent: SurveyEvent): DataState => {
  return {
    ...state.data,
    notes: notesSnapshotReducer(state, surveyEvent),
    spreadsheets: spreadsheetsSnapshotReducer(state, surveyEvent),
    textDocuments: textDocumentsSnapshotReducer(state, surveyEvent),
    common: commonDataSnapshotReducer(state, surveyEvent),
    emails: emailsSnapshotReducer(state, surveyEvent),
    chat: chatSnapshotReducer(state, surveyEvent)
  }
}
