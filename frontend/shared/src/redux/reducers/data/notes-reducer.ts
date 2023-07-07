import {Reducer} from "redux"
import {SharedAppAction} from "../../actions/app-action"
import {DataActionType} from "../../actions/data-action"
import {initialNotesState, NotesState} from "../../state/data"

export const notesReducer: Reducer<NotesState, SharedAppAction> = (state = initialNotesState, action) => {
  switch (action.type) {
    case DataActionType.UpdateNotes:
      return action.payload.note
    default:
      return state
  }
}
