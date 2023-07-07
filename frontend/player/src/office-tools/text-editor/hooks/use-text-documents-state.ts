import {useSelector} from "react-redux"
import {SharedAppState} from "shared/redux/state/app-state"
import {TextDocumentsState} from "shared/redux/state/data"

export interface TextDocumentsContainerState {
  readonly textDocuments: TextDocumentsState
  readonly selectedTextDocumentId: UUID | null
}

export const useTextDocumentsState = (): TextDocumentsContainerState => {
  const localTextDocuments = useSelector<SharedAppState, TextDocumentsState>(s => s.data.textDocuments)
  const selectedTextDocumentId = useSelector<SharedAppState, UUID | null>(
    s => s.ui.textDocumentViewer.selectedTextDocumentId
  )
  return {textDocuments: localTextDocuments, selectedTextDocumentId}
}
