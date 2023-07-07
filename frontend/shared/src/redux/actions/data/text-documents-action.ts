import {Action} from "redux"

export type TextDocumentsAction = TextDocumentContentChangeAction | TextDocumentInitializeAction

export enum TextDocumentsActionType {
  TextDocumentContentChange = "TextDocumentContentChange",
  TextDocumentInitialize = "TextDocumentInitialize"
}

export interface TextDocumentContentChangeAction extends Action {
  readonly type: TextDocumentsActionType.TextDocumentContentChange
  readonly payload: {
    textDocumentId: UUID
    value: string
  }
}

export const textDocumentContentChangeAction = (
  textDocumentId: UUID,
  value: string
): TextDocumentContentChangeAction => ({
  type: TextDocumentsActionType.TextDocumentContentChange,
  payload: {textDocumentId, value}
})

export interface TextDocumentInitializeAction extends Action {
  readonly type: TextDocumentsActionType.TextDocumentInitialize
  readonly payload: {
    textDocumentId: UUID
    value: string
    title: string
    fileId?: UUID
  }
}

export const textDocumentInitializeAction = (
  textDocumentId: UUID,
  value: string,
  title: string,
  fileId?: UUID
): TextDocumentInitializeAction => ({
  type: TextDocumentsActionType.TextDocumentInitialize,
  payload: {textDocumentId, value, title, fileId}
})
