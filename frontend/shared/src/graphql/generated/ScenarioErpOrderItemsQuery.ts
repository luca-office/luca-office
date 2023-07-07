/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL query operation: ScenarioErpOrderItemsQuery
// ====================================================

export interface ScenarioErpOrderItemsQuery_scenarioErpOrderItems {
  __typename: "ScenarioErpOrderItem";
  scenarioId: string;
  sampleCompanyId: string;
  orderItemId: number;
  relevance: Relevance;
}

export interface ScenarioErpOrderItemsQuery {
  scenarioErpOrderItems: ScenarioErpOrderItemsQuery_scenarioErpOrderItems[];
}

export interface ScenarioErpOrderItemsQueryVariables {
  scenarioId: string;
}
