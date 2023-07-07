/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpProductCreation, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateScenarioErpProductMutation
// ====================================================

export interface CreateScenarioErpProductMutation_createScenarioErpProduct {
  __typename: "ScenarioErpProduct";
  scenarioId: string;
  sampleCompanyId: string;
  productId: number;
  relevance: Relevance;
}

export interface CreateScenarioErpProductMutation {
  createScenarioErpProduct: CreateScenarioErpProductMutation_createScenarioErpProduct;
}

export interface CreateScenarioErpProductMutationVariables {
  creation: ScenarioErpProductCreation;
}
