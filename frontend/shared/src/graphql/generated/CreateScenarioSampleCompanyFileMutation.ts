/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioSampleCompanyFileCreation, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateScenarioSampleCompanyFileMutation
// ====================================================

export interface CreateScenarioSampleCompanyFileMutation_createScenarioSampleCompanyFile {
  __typename: "ScenarioSampleCompanyFile";
  scenarioId: string;
  fileId: string;
  relevance: Relevance;
}

export interface CreateScenarioSampleCompanyFileMutation {
  createScenarioSampleCompanyFile: CreateScenarioSampleCompanyFileMutation_createScenarioSampleCompanyFile;
}

export interface CreateScenarioSampleCompanyFileMutationVariables {
  creation: ScenarioSampleCompanyFileCreation;
}
