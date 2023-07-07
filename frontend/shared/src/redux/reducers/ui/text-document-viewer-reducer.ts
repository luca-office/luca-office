import {Reducer} from "redux"
import {BinaryViewerTool} from "../../../enums"
import {SharedAppAction} from "../../actions/app-action"
import {TextDocumentViewerActionType} from "../../actions/ui/text-document-viewer-action"
import {WindowManagerActionType} from "../../actions/ui/window-manager-action"
import {initialTextDocumentViewerState, TextDocumentViewerState} from "../../state/ui/text-document-viewer-state"

export const textDocumentViewerReducer: Reducer<TextDocumentViewerState, SharedAppAction> = (
  state = initialTextDocumentViewerState,
  action
): TextDocumentViewerState => {
  switch (action.type) {
    case TextDocumentViewerActionType.OpenTextDocument:
      return {
        ...state,
        selectedTextDocumentId: action.payload.textDocumentId
      }
    case TextDocumentViewerActionType.CloseTextDocument:
    case WindowManagerActionType.CloseAllWindows:
      return initialTextDocumentViewerState
    case WindowManagerActionType.CloseWindow:
      return action.payload.targetWindow === BinaryViewerTool.TextEditor ? initialTextDocumentViewerState : state
    default:
      return state
  }
}
