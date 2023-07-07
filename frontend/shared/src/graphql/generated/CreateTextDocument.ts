/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TextDocumentCreation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTextDocument
// ====================================================

export interface CreateTextDocument_createTextDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface CreateTextDocument {
  createTextDocument: CreateTextDocument_createTextDocument;
}

export interface CreateTextDocumentVariables {
  creation: TextDocumentCreation;
}
