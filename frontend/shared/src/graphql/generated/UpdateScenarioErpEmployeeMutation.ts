/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpEmployeeUpdate, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateScenarioErpEmployeeMutation
// ====================================================

export interface UpdateScenarioErpEmployeeMutation_updateScenarioErpEmployee {
  __typename: "ScenarioErpEmployee";
  scenarioId: string;
  sampleCompanyId: string;
  employeeId: number;
  relevance: Relevance;
}

export interface UpdateScenarioErpEmployeeMutation {
  updateScenarioErpEmployee: UpdateScenarioErpEmployeeMutation_updateScenarioErpEmployee;
}

export interface UpdateScenarioErpEmployeeMutationVariables {
  scenarioId: string;
  employeeId: number;
  update: ScenarioErpEmployeeUpdate;
}
