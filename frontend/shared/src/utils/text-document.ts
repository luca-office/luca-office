import {TextDocument} from "../models"
import {TextDocumentsState} from "../redux/state/data"

export const localTextDocumentToTextDocument = (localTextDocuments: TextDocumentsState): TextDocument[] =>
  Object.values(localTextDocuments).map(localTextDocument => ({
    id: localTextDocument.id,
    __typename: "TextDocument",
    createdAt: "",
    modifiedAt: "",
    filename: "",
    fileSize: -1,
    content: localTextDocument.content
  }))
