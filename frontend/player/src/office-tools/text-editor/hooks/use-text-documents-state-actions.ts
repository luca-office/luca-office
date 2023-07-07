import {useDispatch} from "react-redux"
import {LocalTextDocument} from "shared/models"
import {TextDocumentsContainerStateActions} from "shared/office-tools/text-editor/text-editor-container"
import {
  textDocumentContentChangeAction,
  textDocumentInitializeAction
} from "shared/redux/actions/data/text-documents-action"

export const useTextDocumentsStateActions = (): TextDocumentsContainerStateActions => {
  const dispatch = useDispatch()

  const updateTextDocument = (textDocumentId: UUID, value: string) =>
    dispatch(textDocumentContentChangeAction(textDocumentId, value))

  const initializeLocalTextDocument = (textDocument: LocalTextDocument) =>
    dispatch(
      textDocumentInitializeAction(textDocument.id, textDocument.content, textDocument.title, textDocument.fileId)
    )

  return {updateTextDocument, initializeLocalTextDocument}
}
