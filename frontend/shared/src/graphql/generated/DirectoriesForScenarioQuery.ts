/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DirectoriesForScenarioQuery
// ====================================================

export interface DirectoriesForScenarioQuery_directoriesForScenario {
  __typename: "Directory";
  id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  parentDirectoryId: string | null;
  scenarioId: string | null;
  sampleCompanyId: string | null;
}

export interface DirectoriesForScenarioQuery {
  directoriesForScenario: DirectoriesForScenarioQuery_directoriesForScenario[];
}

export interface DirectoriesForScenarioQueryVariables {
  scenarioId: string;
}
