/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ArchiveRScriptMutation
// ====================================================

export interface ArchiveRScriptMutation_archiveRScript {
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

export interface ArchiveRScriptMutation {
  archiveRScript: ArchiveRScriptMutation_archiveRScript;
}

export interface ArchiveRScriptMutationVariables {
  id: string;
}
