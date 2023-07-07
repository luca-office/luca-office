/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DirectoryUpdate } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateDirectoryMutation
// ====================================================

export interface UpdateDirectoryMutation_updateDirectory {
  __typename: "Directory";
  id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  parentDirectoryId: string | null;
  scenarioId: string | null;
  sampleCompanyId: string | null;
}

export interface UpdateDirectoryMutation {
  updateDirectory: UpdateDirectoryMutation_updateDirectory;
}

export interface UpdateDirectoryMutationVariables {
  id: string;
  update: DirectoryUpdate;
}
