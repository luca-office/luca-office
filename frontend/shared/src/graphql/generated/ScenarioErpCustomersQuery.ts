/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL query operation: ScenarioErpCustomersQuery
// ====================================================

export interface ScenarioErpCustomersQuery_scenarioErpCustomers {
  __typename: "ScenarioErpCustomer";
  scenarioId: string;
  sampleCompanyId: string;
  customerId: number;
  relevance: Relevance;
}

export interface ScenarioErpCustomersQuery {
  scenarioErpCustomers: ScenarioErpCustomersQuery_scenarioErpCustomers[];
}

export interface ScenarioErpCustomersQueryVariables {
  scenarioId: string;
}
