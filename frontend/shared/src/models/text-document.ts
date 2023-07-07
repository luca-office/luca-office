import {TextDocumentFragment} from "../graphql/generated/TextDocumentFragment"

export type TextDocument = TextDocumentFragment

export interface LocalTextDocument {
  readonly id: UUID
  readonly fileId?: UUID
  readonly title: string
  readonly content: string
}
