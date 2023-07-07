/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DirectoriesForSampleCompanyQuery
// ====================================================

export interface DirectoriesForSampleCompanyQuery_directoriesForSampleCompany {
  __typename: "Directory";
  id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  parentDirectoryId: string | null;
  scenarioId: string | null;
  sampleCompanyId: string | null;
}

export interface DirectoriesForSampleCompanyQuery {
  directoriesForSampleCompany: DirectoriesForSampleCompanyQuery_directoriesForSampleCompany[];
}

export interface DirectoriesForSampleCompanyQueryVariables {
  sampleCompanyId: string;
}
