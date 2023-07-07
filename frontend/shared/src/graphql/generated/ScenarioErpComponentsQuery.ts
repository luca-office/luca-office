/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL query operation: ScenarioErpComponentsQuery
// ====================================================

export interface ScenarioErpComponentsQuery_scenarioErpComponents {
  __typename: "ScenarioErpComponent";
  scenarioId: string;
  sampleCompanyId: string;
  componentId: number;
  relevance: Relevance;
}

export interface ScenarioErpComponentsQuery {
  scenarioErpComponents: ScenarioErpComponentsQuery_scenarioErpComponents[];
}

export interface ScenarioErpComponentsQueryVariables {
  scenarioId: string;
}
