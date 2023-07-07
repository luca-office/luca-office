/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL query operation: ScenarioErpOrdersQuery
// ====================================================

export interface ScenarioErpOrdersQuery_scenarioErpOrders {
  __typename: "ScenarioErpOrder";
  scenarioId: string;
  sampleCompanyId: string;
  orderId: number;
  relevance: Relevance;
}

export interface ScenarioErpOrdersQuery {
  scenarioErpOrders: ScenarioErpOrdersQuery_scenarioErpOrders[];
}

export interface ScenarioErpOrdersQueryVariables {
  scenarioId: string;
}
