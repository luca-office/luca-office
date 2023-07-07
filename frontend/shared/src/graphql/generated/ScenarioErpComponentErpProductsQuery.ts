/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL query operation: ScenarioErpComponentErpProductsQuery
// ====================================================

export interface ScenarioErpComponentErpProductsQuery_scenarioErpComponentErpProducts {
  __typename: "ScenarioErpComponentErpProduct";
  scenarioId: string;
  sampleCompanyId: string;
  relevance: Relevance;
  componentProductId: number;
}

export interface ScenarioErpComponentErpProductsQuery {
  scenarioErpComponentErpProducts: ScenarioErpComponentErpProductsQuery_scenarioErpComponentErpProducts[];
}

export interface ScenarioErpComponentErpProductsQueryVariables {
  scenarioId: string;
}
