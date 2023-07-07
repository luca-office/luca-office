/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DirectoryCreation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateDirectoryMutation
// ====================================================

export interface CreateDirectoryMutation_createDirectory {
  __typename: "Directory";
  id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  parentDirectoryId: string | null;
  scenarioId: string | null;
  sampleCompanyId: string | null;
}

export interface CreateDirectoryMutation {
  createDirectory: CreateDirectoryMutation_createDirectory;
}

export interface CreateDirectoryMutationVariables {
  creation: DirectoryCreation;
}
