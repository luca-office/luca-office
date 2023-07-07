/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FeatureUsageScenarioCodingAutomatedCriterionUpdate, OfficeTool, FeatureType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateFeatureUsageScenarioCodingAutomatedCriterionMutation
// ====================================================

export interface UpdateFeatureUsageScenarioCodingAutomatedCriterionMutation_updateFeatureUsageScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion {
  __typename: "DocumentViewScenarioCodingAutomatedCriterion" | "InputValueScenarioCodingAutomatedCriterion" | "RScriptScenarioCodingAutomatedCriterion" | "ToolUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
}

export interface UpdateFeatureUsageScenarioCodingAutomatedCriterionMutation_updateFeatureUsageScenarioCodingAutomatedCriterion_FeatureUsageScenarioCodingAutomatedCriterion {
  __typename: "FeatureUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  officeTool: OfficeTool;
  featureType: FeatureType;
}

export type UpdateFeatureUsageScenarioCodingAutomatedCriterionMutation_updateFeatureUsageScenarioCodingAutomatedCriterion = UpdateFeatureUsageScenarioCodingAutomatedCriterionMutation_updateFeatureUsageScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion | UpdateFeatureUsageScenarioCodingAutomatedCriterionMutation_updateFeatureUsageScenarioCodingAutomatedCriterion_FeatureUsageScenarioCodingAutomatedCriterion;

export interface UpdateFeatureUsageScenarioCodingAutomatedCriterionMutation {
  updateFeatureUsageScenarioCodingAutomatedCriterion: UpdateFeatureUsageScenarioCodingAutomatedCriterionMutation_updateFeatureUsageScenarioCodingAutomatedCriterion;
}

export interface UpdateFeatureUsageScenarioCodingAutomatedCriterionMutationVariables {
  id: string;
  update: FeatureUsageScenarioCodingAutomatedCriterionUpdate;
}
