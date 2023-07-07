export interface TextDocumentViewerState {
  readonly selectedTextDocumentId: UUID | null
}

export const initialTextDocumentViewerState: TextDocumentViewerState = {
  selectedTextDocumentId: null
}
