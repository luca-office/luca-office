/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpProductUpdate, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateScenarioErpProductMutation
// ====================================================

export interface UpdateScenarioErpProductMutation_updateScenarioErpProduct {
  __typename: "ScenarioErpProduct";
  scenarioId: string;
  sampleCompanyId: string;
  productId: number;
  relevance: Relevance;
}

export interface UpdateScenarioErpProductMutation {
  updateScenarioErpProduct: UpdateScenarioErpProductMutation_updateScenarioErpProduct;
}

export interface UpdateScenarioErpProductMutationVariables {
  scenarioId: string;
  productId: number;
  update: ScenarioErpProductUpdate;
}
