/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpOrderItemUpdate, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateScenarioErpOrderItemMutation
// ====================================================

export interface UpdateScenarioErpOrderItemMutation_updateScenarioErpOrderItem {
  __typename: "ScenarioErpOrderItem";
  scenarioId: string;
  sampleCompanyId: string;
  orderItemId: number;
  relevance: Relevance;
}

export interface UpdateScenarioErpOrderItemMutation {
  updateScenarioErpOrderItem: UpdateScenarioErpOrderItemMutation_updateScenarioErpOrderItem;
}

export interface UpdateScenarioErpOrderItemMutationVariables {
  scenarioId: string;
  orderItemId: number;
  update: ScenarioErpOrderItemUpdate;
}
