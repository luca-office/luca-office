import {useDispatch} from "react-redux"
import {LocalTextDocument} from "shared/models"
import {TextDocumentsContainerStateActions} from "shared/office-tools/text-editor/text-editor-container"
import {
  textDocumentContentChangeAction,
  textDocumentInitializeAction
} from "shared/redux/actions/data/text-documents-action"

export const useTextDocumentsSnapshotStateActions = (): TextDocumentsContainerStateActions => {
  const dispatch = useDispatch()

  const initializeLocalTextDocument = (textDocument: LocalTextDocument) =>
    dispatch(
      textDocumentInitializeAction(textDocument.id, textDocument.content, textDocument.title, textDocument.fileId)
    )

  const updateTextDocument = (textDocumentId: UUID, value: string) =>
    dispatch(textDocumentContentChangeAction(textDocumentId, value))

  return {updateTextDocument, initializeLocalTextDocument}
}
