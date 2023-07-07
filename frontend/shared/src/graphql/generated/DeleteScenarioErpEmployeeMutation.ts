/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteScenarioErpEmployeeMutation
// ====================================================

export interface DeleteScenarioErpEmployeeMutation_deleteScenarioErpEmployee {
  __typename: "ScenarioErpEmployee";
  scenarioId: string;
  sampleCompanyId: string;
  employeeId: number;
  relevance: Relevance;
}

export interface DeleteScenarioErpEmployeeMutation {
  deleteScenarioErpEmployee: DeleteScenarioErpEmployeeMutation_deleteScenarioErpEmployee;
}

export interface DeleteScenarioErpEmployeeMutationVariables {
  scenarioId: string;
  employeeId: number;
}
