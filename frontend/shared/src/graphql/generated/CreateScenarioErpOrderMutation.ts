/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpOrderCreation, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateScenarioErpOrderMutation
// ====================================================

export interface CreateScenarioErpOrderMutation_createScenarioErpOrder {
  __typename: "ScenarioErpOrder";
  scenarioId: string;
  sampleCompanyId: string;
  orderId: number;
  relevance: Relevance;
}

export interface CreateScenarioErpOrderMutation {
  createScenarioErpOrder: CreateScenarioErpOrderMutation_createScenarioErpOrder;
}

export interface CreateScenarioErpOrderMutationVariables {
  creation: ScenarioErpOrderCreation;
}
