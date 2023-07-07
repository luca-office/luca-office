import {Reducer} from "redux"
import {SharedAppAction} from "../../actions/app-action"
import {TextDocumentsActionType} from "../../actions/data/text-documents-action"
import {initialTextDocumentState, TextDocumentsState} from "../../state/data"

export const textDocumentReducer: Reducer<TextDocumentsState, SharedAppAction> = (
  state = initialTextDocumentState,
  action
) => {
  switch (action.type) {
    case TextDocumentsActionType.TextDocumentContentChange:
      return {
        ...state,
        [action.payload.textDocumentId]: {
          id: action.payload.textDocumentId,
          content: action.payload.value,
          title: state[action.payload.textDocumentId]?.title,
          fileId: state[action.payload.textDocumentId]?.fileId
        }
      }
    case TextDocumentsActionType.TextDocumentInitialize:
      return {
        ...state,
        [action.payload.textDocumentId]: {
          id: action.payload.textDocumentId,
          content: action.payload.value,
          title: action.payload.title,
          fileId: action.payload.fileId
        }
      }
    default:
      return state
  }
}
