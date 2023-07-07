/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TextDocumentUpdate } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTextDocument
// ====================================================

export interface UpdateTextDocument_updateTextDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface UpdateTextDocument {
  updateTextDocument: UpdateTextDocument_updateTextDocument;
}

export interface UpdateTextDocumentVariables {
  id: string;
  update: TextDocumentUpdate;
}
