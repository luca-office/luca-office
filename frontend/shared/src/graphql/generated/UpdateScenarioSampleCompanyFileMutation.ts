/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioSampleCompanyFileUpdate, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateScenarioSampleCompanyFileMutation
// ====================================================

export interface UpdateScenarioSampleCompanyFileMutation_updateScenarioSampleCompanyFile {
  __typename: "ScenarioSampleCompanyFile";
  scenarioId: string;
  fileId: string;
  relevance: Relevance;
}

export interface UpdateScenarioSampleCompanyFileMutation {
  updateScenarioSampleCompanyFile: UpdateScenarioSampleCompanyFileMutation_updateScenarioSampleCompanyFile;
}

export interface UpdateScenarioSampleCompanyFileMutationVariables {
  scenarioId: string;
  fileId: string;
  update: ScenarioSampleCompanyFileUpdate;
}
