/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DirectoryQuery
// ====================================================

export interface DirectoryQuery_directory {
  __typename: "Directory";
  id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  parentDirectoryId: string | null;
  scenarioId: string | null;
  sampleCompanyId: string | null;
}

export interface DirectoryQuery {
  directory: DirectoryQuery_directory | null;
}

export interface DirectoryQueryVariables {
  id: string;
}
