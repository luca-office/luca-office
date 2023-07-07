/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TextDocumentQuery
// ====================================================

export interface TextDocumentQuery_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface TextDocumentQuery {
  textDocument: TextDocumentQuery_textDocument | null;
}

export interface TextDocumentQueryVariables {
  id: string;
}
