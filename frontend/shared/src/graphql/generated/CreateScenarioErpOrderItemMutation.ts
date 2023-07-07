/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpOrderItemCreation, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateScenarioErpOrderItemMutation
// ====================================================

export interface CreateScenarioErpOrderItemMutation_createScenarioErpOrderItem {
  __typename: "ScenarioErpOrderItem";
  scenarioId: string;
  sampleCompanyId: string;
  orderItemId: number;
  relevance: Relevance;
}

export interface CreateScenarioErpOrderItemMutation {
  createScenarioErpOrderItem: CreateScenarioErpOrderItemMutation_createScenarioErpOrderItem;
}

export interface CreateScenarioErpOrderItemMutationVariables {
  creation: ScenarioErpOrderItemCreation;
}
