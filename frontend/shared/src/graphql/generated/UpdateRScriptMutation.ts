/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RScriptUpdate } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateRScriptMutation
// ====================================================

export interface UpdateRScriptMutation_updateRScript {
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

export interface UpdateRScriptMutation {
  updateRScript: UpdateRScriptMutation_updateRScript;
}

export interface UpdateRScriptMutationVariables {
  id: string;
  update: RScriptUpdate;
}
