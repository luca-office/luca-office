/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL query operation: ScenarioSampleCompanyFilesQuery
// ====================================================

export interface ScenarioSampleCompanyFilesQuery_scenarioSampleCompanyFiles {
  __typename: "ScenarioSampleCompanyFile";
  scenarioId: string;
  fileId: string;
  relevance: Relevance;
}

export interface ScenarioSampleCompanyFilesQuery {
  scenarioSampleCompanyFiles: ScenarioSampleCompanyFilesQuery_scenarioSampleCompanyFiles[];
}

export interface ScenarioSampleCompanyFilesQueryVariables {
  scenarioId: string;
}
