/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteScenarioErpSupplierMutation
// ====================================================

export interface DeleteScenarioErpSupplierMutation_deleteScenarioErpSupplier {
  __typename: "ScenarioErpSupplier";
  scenarioId: string;
  sampleCompanyId: string;
  supplierId: number;
  relevance: Relevance;
}

export interface DeleteScenarioErpSupplierMutation {
  deleteScenarioErpSupplier: DeleteScenarioErpSupplierMutation_deleteScenarioErpSupplier;
}

export interface DeleteScenarioErpSupplierMutationVariables {
  scenarioId: string;
  supplierId: number;
}
