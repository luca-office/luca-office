/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpComponentErpProductUpdate, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateScenarioErpComponentErpProductMutation
// ====================================================

export interface UpdateScenarioErpComponentErpProductMutation_updateScenarioErpComponentErpProduct {
  __typename: "ScenarioErpComponentErpProduct";
  scenarioId: string;
  sampleCompanyId: string;
  relevance: Relevance;
  componentProductId: number;
}

export interface UpdateScenarioErpComponentErpProductMutation {
  updateScenarioErpComponentErpProduct: UpdateScenarioErpComponentErpProductMutation_updateScenarioErpComponentErpProduct;
}

export interface UpdateScenarioErpComponentErpProductMutationVariables {
  scenarioId: string;
  componentProductId: number;
  update: ScenarioErpComponentErpProductUpdate;
}
