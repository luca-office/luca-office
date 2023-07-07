/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteScenarioErpCustomerMutation
// ====================================================

export interface DeleteScenarioErpCustomerMutation_deleteScenarioErpCustomer {
  __typename: "ScenarioErpCustomer";
  scenarioId: string;
  sampleCompanyId: string;
  customerId: number;
  relevance: Relevance;
}

export interface DeleteScenarioErpCustomerMutation {
  deleteScenarioErpCustomer: DeleteScenarioErpCustomerMutation_deleteScenarioErpCustomer;
}

export interface DeleteScenarioErpCustomerMutationVariables {
  scenarioId: string;
  customerId: number;
}
