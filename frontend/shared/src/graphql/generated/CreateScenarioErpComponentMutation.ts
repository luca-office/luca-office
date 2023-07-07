/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpComponentCreation, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateScenarioErpComponentMutation
// ====================================================

export interface CreateScenarioErpComponentMutation_createScenarioErpComponent {
  __typename: "ScenarioErpComponent";
  scenarioId: string;
  sampleCompanyId: string;
  componentId: number;
  relevance: Relevance;
}

export interface CreateScenarioErpComponentMutation {
  createScenarioErpComponent: CreateScenarioErpComponentMutation_createScenarioErpComponent;
}

export interface CreateScenarioErpComponentMutationVariables {
  creation: ScenarioErpComponentCreation;
}
