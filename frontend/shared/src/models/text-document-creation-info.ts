import {TextDocumentCreation} from "../graphql/generated/globalTypes"

export interface TextDocumentCreationInfo {
  readonly textDocument: TextDocumentCreation
  readonly title: string
  readonly directoryId?: UUID
}
