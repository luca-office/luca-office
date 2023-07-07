/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteScenarioErpComponentErpProductMutation
// ====================================================

export interface DeleteScenarioErpComponentErpProductMutation_deleteScenarioErpComponentErpProduct {
  __typename: "ScenarioErpComponentErpProduct";
  scenarioId: string;
  sampleCompanyId: string;
  relevance: Relevance;
  componentProductId: number;
}

export interface DeleteScenarioErpComponentErpProductMutation {
  deleteScenarioErpComponentErpProduct: DeleteScenarioErpComponentErpProductMutation_deleteScenarioErpComponentErpProduct;
}

export interface DeleteScenarioErpComponentErpProductMutationVariables {
  scenarioId: string;
  componentProductId: number;
}
