/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpComponentUpdate, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateScenarioErpComponentMutation
// ====================================================

export interface UpdateScenarioErpComponentMutation_updateScenarioErpComponent {
  __typename: "ScenarioErpComponent";
  scenarioId: string;
  sampleCompanyId: string;
  componentId: number;
  relevance: Relevance;
}

export interface UpdateScenarioErpComponentMutation {
  updateScenarioErpComponent: UpdateScenarioErpComponentMutation_updateScenarioErpComponent;
}

export interface UpdateScenarioErpComponentMutationVariables {
  scenarioId: string;
  componentId: number;
  update: ScenarioErpComponentUpdate;
}
