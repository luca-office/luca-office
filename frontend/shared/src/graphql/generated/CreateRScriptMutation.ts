/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RScriptCreation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateRScriptMutation
// ====================================================

export interface CreateRScriptMutation_createRScript {
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

export interface CreateRScriptMutation {
  createRScript: CreateRScriptMutation_createRScript;
}

export interface CreateRScriptMutationVariables {
  creation: RScriptCreation;
}
