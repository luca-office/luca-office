/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpComponentErpProductCreation, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateScenarioErpComponentErpProductMutation
// ====================================================

export interface CreateScenarioErpComponentErpProductMutation_createScenarioErpComponentErpProduct {
  __typename: "ScenarioErpComponentErpProduct";
  scenarioId: string;
  sampleCompanyId: string;
  relevance: Relevance;
  componentProductId: number;
}

export interface CreateScenarioErpComponentErpProductMutation {
  createScenarioErpComponentErpProduct: CreateScenarioErpComponentErpProductMutation_createScenarioErpComponentErpProduct;
}

export interface CreateScenarioErpComponentErpProductMutationVariables {
  creation: ScenarioErpComponentErpProductCreation;
}
