/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteScenarioSampleCompanyFileMutation
// ====================================================

export interface DeleteScenarioSampleCompanyFileMutation_deleteScenarioSampleCompanyFile {
  __typename: "ScenarioSampleCompanyFile";
  scenarioId: string;
  fileId: string;
  relevance: Relevance;
}

export interface DeleteScenarioSampleCompanyFileMutation {
  deleteScenarioSampleCompanyFile: DeleteScenarioSampleCompanyFileMutation_deleteScenarioSampleCompanyFile;
}

export interface DeleteScenarioSampleCompanyFileMutationVariables {
  scenarioId: string;
  fileId: string;
}
