/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpSupplierUpdate, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateScenarioErpSupplierMutation
// ====================================================

export interface UpdateScenarioErpSupplierMutation_updateScenarioErpSupplier {
  __typename: "ScenarioErpSupplier";
  scenarioId: string;
  sampleCompanyId: string;
  supplierId: number;
  relevance: Relevance;
}

export interface UpdateScenarioErpSupplierMutation {
  updateScenarioErpSupplier: UpdateScenarioErpSupplierMutation_updateScenarioErpSupplier;
}

export interface UpdateScenarioErpSupplierMutationVariables {
  scenarioId: string;
  supplierId: number;
  update: ScenarioErpSupplierUpdate;
}
