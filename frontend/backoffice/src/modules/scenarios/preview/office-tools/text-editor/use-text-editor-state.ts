import {useSelector} from "react-redux"
import {TextDocumentsState} from "shared/redux/state/data"
import {AppState} from "../../../../../redux/state/app-state"

export interface TextDocumentsContainerState {
  readonly textDocuments: TextDocumentsState
  readonly selectedTextDocumentId: UUID | null
}

export const useTextDocumentsState = (): TextDocumentsContainerState => {
  const localTextDocuments = useSelector<AppState, TextDocumentsState>(s => s.playerPreview.player.data.textDocuments)
  const selectedTextDocumentId = useSelector<AppState, UUID | null>(
    s => s.playerPreview.player.ui.textDocumentViewer.selectedTextDocumentId
  )
  return {textDocuments: localTextDocuments, selectedTextDocumentId}
}
