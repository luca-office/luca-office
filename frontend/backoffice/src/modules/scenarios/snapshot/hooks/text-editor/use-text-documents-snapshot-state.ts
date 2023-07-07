import {useSelector} from "react-redux"
import {TextDocumentsContainerState} from "shared/office-tools/text-editor/text-editor-container"
import {TextDocumentsState} from "shared/redux/state/data"
import {AppState} from "../../../../../redux/state/app-state"

export const useTextDocumentsSnapshotState = (): TextDocumentsContainerState => {
  const localTextDocuments = useSelector<AppState, TextDocumentsState>(s => s.playerPreview.player.data.textDocuments)

  const selectedTextDocumentId = useSelector<AppState, UUID | null>(
    s => s.playerPreview.player.ui.textDocumentViewer.selectedTextDocumentId
  )
  return {textDocuments: localTextDocuments, selectedTextDocumentId}
}
