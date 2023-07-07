/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteScenarioErpOrderMutation
// ====================================================

export interface DeleteScenarioErpOrderMutation_deleteScenarioErpOrder {
  __typename: "ScenarioErpOrder";
  scenarioId: string;
  sampleCompanyId: string;
  orderId: number;
  relevance: Relevance;
}

export interface DeleteScenarioErpOrderMutation {
  deleteScenarioErpOrder: DeleteScenarioErpOrderMutation_deleteScenarioErpOrder;
}

export interface DeleteScenarioErpOrderMutationVariables {
  scenarioId: string;
  orderId: number;
}
