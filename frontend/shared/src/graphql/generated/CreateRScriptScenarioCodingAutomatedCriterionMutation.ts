/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RScriptScenarioCodingAutomatedCriterionCreation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateRScriptScenarioCodingAutomatedCriterionMutation
// ====================================================

export interface CreateRScriptScenarioCodingAutomatedCriterionMutation_createRScriptScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion {
  __typename: "DocumentViewScenarioCodingAutomatedCriterion" | "FeatureUsageScenarioCodingAutomatedCriterion" | "InputValueScenarioCodingAutomatedCriterion" | "ToolUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
}

export interface CreateRScriptScenarioCodingAutomatedCriterionMutation_createRScriptScenarioCodingAutomatedCriterion_RScriptScenarioCodingAutomatedCriterion {
  __typename: "RScriptScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  rScriptId: string;
}

export type CreateRScriptScenarioCodingAutomatedCriterionMutation_createRScriptScenarioCodingAutomatedCriterion = CreateRScriptScenarioCodingAutomatedCriterionMutation_createRScriptScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion | CreateRScriptScenarioCodingAutomatedCriterionMutation_createRScriptScenarioCodingAutomatedCriterion_RScriptScenarioCodingAutomatedCriterion;

export interface CreateRScriptScenarioCodingAutomatedCriterionMutation {
  createRScriptScenarioCodingAutomatedCriterion: CreateRScriptScenarioCodingAutomatedCriterionMutation_createRScriptScenarioCodingAutomatedCriterion;
}

export interface CreateRScriptScenarioCodingAutomatedCriterionMutationVariables {
  creation: RScriptScenarioCodingAutomatedCriterionCreation;
}
