/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL query operation: ScenarioErpEmployeesQuery
// ====================================================

export interface ScenarioErpEmployeesQuery_scenarioErpEmployees {
  __typename: "ScenarioErpEmployee";
  scenarioId: string;
  sampleCompanyId: string;
  employeeId: number;
  relevance: Relevance;
}

export interface ScenarioErpEmployeesQuery {
  scenarioErpEmployees: ScenarioErpEmployeesQuery_scenarioErpEmployees[];
}

export interface ScenarioErpEmployeesQueryVariables {
  scenarioId: string;
}
