/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RScriptScenarioCodingAutomatedCriterionUpdate } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateRScriptScenarioCodingAutomatedCriterionMutation
// ====================================================

export interface UpdateRScriptScenarioCodingAutomatedCriterionMutation_updateRScriptScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion {
  __typename: "DocumentViewScenarioCodingAutomatedCriterion" | "FeatureUsageScenarioCodingAutomatedCriterion" | "InputValueScenarioCodingAutomatedCriterion" | "ToolUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
}

export interface UpdateRScriptScenarioCodingAutomatedCriterionMutation_updateRScriptScenarioCodingAutomatedCriterion_RScriptScenarioCodingAutomatedCriterion {
  __typename: "RScriptScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  rScriptId: string;
}

export type UpdateRScriptScenarioCodingAutomatedCriterionMutation_updateRScriptScenarioCodingAutomatedCriterion = UpdateRScriptScenarioCodingAutomatedCriterionMutation_updateRScriptScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion | UpdateRScriptScenarioCodingAutomatedCriterionMutation_updateRScriptScenarioCodingAutomatedCriterion_RScriptScenarioCodingAutomatedCriterion;

export interface UpdateRScriptScenarioCodingAutomatedCriterionMutation {
  updateRScriptScenarioCodingAutomatedCriterion: UpdateRScriptScenarioCodingAutomatedCriterionMutation_updateRScriptScenarioCodingAutomatedCriterion;
}

export interface UpdateRScriptScenarioCodingAutomatedCriterionMutationVariables {
  id: string;
  update: RScriptScenarioCodingAutomatedCriterionUpdate;
}
