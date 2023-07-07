/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpCustomerCreation, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateScenarioErpCustomerMutation
// ====================================================

export interface CreateScenarioErpCustomerMutation_createScenarioErpCustomer {
  __typename: "ScenarioErpCustomer";
  scenarioId: string;
  sampleCompanyId: string;
  customerId: number;
  relevance: Relevance;
}

export interface CreateScenarioErpCustomerMutation {
  createScenarioErpCustomer: CreateScenarioErpCustomerMutation_createScenarioErpCustomer;
}

export interface CreateScenarioErpCustomerMutationVariables {
  creation: ScenarioErpCustomerCreation;
}
