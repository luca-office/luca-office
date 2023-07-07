import {Action} from "redux"

export type TextDocumentViewerAction = OpenTextDocumentAction | CloseTextDocumentAction | SelectTextDocumentAction

export enum TextDocumentViewerActionType {
  OpenTextDocument = "OpenTextDocument",
  SelectTextDocument = "SelectTextDocument",
  CloseTextDocument = "CloseTextDocument"
}

export interface OpenTextDocumentAction extends Action {
  readonly type: TextDocumentViewerActionType.OpenTextDocument
  readonly payload: {
    readonly textDocumentId: UUID
  }
}

export const openTextDocument = (textDocumentId: UUID): OpenTextDocumentAction => ({
  type: TextDocumentViewerActionType.OpenTextDocument,
  payload: {textDocumentId}
})

export interface CloseTextDocumentAction extends Action {
  readonly type: TextDocumentViewerActionType.CloseTextDocument
  readonly payload: {
    readonly textDocumentId: UUID
  }
}

export const closeTextDocument = (textDocumentId: UUID): CloseTextDocumentAction => ({
  type: TextDocumentViewerActionType.CloseTextDocument,
  payload: {textDocumentId}
})

export interface SelectTextDocumentAction extends Action {
  readonly type: TextDocumentViewerActionType.SelectTextDocument
  readonly payload: {
    readonly textDocumentId: UUID
  }
}

export const selectTextDocument = (textDocumentId: UUID): SelectTextDocumentAction => ({
  type: TextDocumentViewerActionType.SelectTextDocument,
  payload: {textDocumentId}
})
