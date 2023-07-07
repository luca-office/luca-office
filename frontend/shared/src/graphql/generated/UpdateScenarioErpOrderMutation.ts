/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpOrderUpdate, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateScenarioErpOrderMutation
// ====================================================

export interface UpdateScenarioErpOrderMutation_updateScenarioErpOrder {
  __typename: "ScenarioErpOrder";
  scenarioId: string;
  sampleCompanyId: string;
  orderId: number;
  relevance: Relevance;
}

export interface UpdateScenarioErpOrderMutation {
  updateScenarioErpOrder: UpdateScenarioErpOrderMutation_updateScenarioErpOrder;
}

export interface UpdateScenarioErpOrderMutationVariables {
  scenarioId: string;
  orderId: number;
  update: ScenarioErpOrderUpdate;
}
