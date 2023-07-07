/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpCustomerUpdate, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateScenarioErpCustomerMutation
// ====================================================

export interface UpdateScenarioErpCustomerMutation_updateScenarioErpCustomer {
  __typename: "ScenarioErpCustomer";
  scenarioId: string;
  sampleCompanyId: string;
  customerId: number;
  relevance: Relevance;
}

export interface UpdateScenarioErpCustomerMutation {
  updateScenarioErpCustomer: UpdateScenarioErpCustomerMutation_updateScenarioErpCustomer;
}

export interface UpdateScenarioErpCustomerMutationVariables {
  scenarioId: string;
  customerId: number;
  update: ScenarioErpCustomerUpdate;
}
