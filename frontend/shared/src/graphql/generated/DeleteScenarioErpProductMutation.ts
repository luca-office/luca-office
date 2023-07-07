/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteScenarioErpProductMutation
// ====================================================

export interface DeleteScenarioErpProductMutation_deleteScenarioErpProduct {
  __typename: "ScenarioErpProduct";
  scenarioId: string;
  sampleCompanyId: string;
  productId: number;
  relevance: Relevance;
}

export interface DeleteScenarioErpProductMutation {
  deleteScenarioErpProduct: DeleteScenarioErpProductMutation_deleteScenarioErpProduct;
}

export interface DeleteScenarioErpProductMutationVariables {
  scenarioId: string;
  productId: number;
}
