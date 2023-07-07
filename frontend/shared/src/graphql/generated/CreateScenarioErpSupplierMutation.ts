/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpSupplierCreation, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateScenarioErpSupplierMutation
// ====================================================

export interface CreateScenarioErpSupplierMutation_createScenarioErpSupplier {
  __typename: "ScenarioErpSupplier";
  scenarioId: string;
  sampleCompanyId: string;
  supplierId: number;
  relevance: Relevance;
}

export interface CreateScenarioErpSupplierMutation {
  createScenarioErpSupplier: CreateScenarioErpSupplierMutation_createScenarioErpSupplier;
}

export interface CreateScenarioErpSupplierMutationVariables {
  creation: ScenarioErpSupplierCreation;
}
