/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteScenarioErpComponentMutation
// ====================================================

export interface DeleteScenarioErpComponentMutation_deleteScenarioErpComponent {
  __typename: "ScenarioErpComponent";
  scenarioId: string;
  sampleCompanyId: string;
  componentId: number;
  relevance: Relevance;
}

export interface DeleteScenarioErpComponentMutation {
  deleteScenarioErpComponent: DeleteScenarioErpComponentMutation_deleteScenarioErpComponent;
}

export interface DeleteScenarioErpComponentMutationVariables {
  scenarioId: string;
  componentId: number;
}
