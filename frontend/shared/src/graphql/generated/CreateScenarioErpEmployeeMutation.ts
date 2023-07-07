/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpEmployeeCreation, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateScenarioErpEmployeeMutation
// ====================================================

export interface CreateScenarioErpEmployeeMutation_createScenarioErpEmployee {
  __typename: "ScenarioErpEmployee";
  scenarioId: string;
  sampleCompanyId: string;
  employeeId: number;
  relevance: Relevance;
}

export interface CreateScenarioErpEmployeeMutation {
  createScenarioErpEmployee: CreateScenarioErpEmployeeMutation_createScenarioErpEmployee;
}

export interface CreateScenarioErpEmployeeMutationVariables {
  creation: ScenarioErpEmployeeCreation;
}
