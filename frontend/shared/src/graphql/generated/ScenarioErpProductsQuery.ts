/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL query operation: ScenarioErpProductsQuery
// ====================================================

export interface ScenarioErpProductsQuery_scenarioErpProducts {
  __typename: "ScenarioErpProduct";
  scenarioId: string;
  sampleCompanyId: string;
  productId: number;
  relevance: Relevance;
}

export interface ScenarioErpProductsQuery {
  scenarioErpProducts: ScenarioErpProductsQuery_scenarioErpProducts[];
}

export interface ScenarioErpProductsQueryVariables {
  scenarioId: string;
}
