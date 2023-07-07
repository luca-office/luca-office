/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RScriptsQuery
// ====================================================

export interface RScriptsQuery_rScripts {
  __typename: "RScript";
  id: string;
  createdAt: string;
  modifiedAt: string;
  title: string;
  description: string;
  archivedAt: string | null;
  version: string;
  gitCommitHash: string;
  isEditable: boolean;
}

export interface RScriptsQuery {
  rScripts: RScriptsQuery_rScripts[];
}
