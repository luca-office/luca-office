/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteScenarioErpOrderItemMutation
// ====================================================

export interface DeleteScenarioErpOrderItemMutation_deleteScenarioErpOrderItem {
  __typename: "ScenarioErpOrderItem";
  scenarioId: string;
  sampleCompanyId: string;
  orderItemId: number;
  relevance: Relevance;
}

export interface DeleteScenarioErpOrderItemMutation {
  deleteScenarioErpOrderItem: DeleteScenarioErpOrderItemMutation_deleteScenarioErpOrderItem;
}

export interface DeleteScenarioErpOrderItemMutationVariables {
  scenarioId: string;
  orderItemId: number;
}
