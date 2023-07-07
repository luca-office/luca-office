/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FeatureUsageScenarioCodingAutomatedCriterionCreation, OfficeTool, FeatureType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateFeatureUsageScenarioCodingAutomatedCriterionMutation
// ====================================================

export interface CreateFeatureUsageScenarioCodingAutomatedCriterionMutation_createFeatureUsageScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion {
  __typename: "DocumentViewScenarioCodingAutomatedCriterion" | "InputValueScenarioCodingAutomatedCriterion" | "RScriptScenarioCodingAutomatedCriterion" | "ToolUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
}

export interface CreateFeatureUsageScenarioCodingAutomatedCriterionMutation_createFeatureUsageScenarioCodingAutomatedCriterion_FeatureUsageScenarioCodingAutomatedCriterion {
  __typename: "FeatureUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  officeTool: OfficeTool;
  featureType: FeatureType;
}

export type CreateFeatureUsageScenarioCodingAutomatedCriterionMutation_createFeatureUsageScenarioCodingAutomatedCriterion = CreateFeatureUsageScenarioCodingAutomatedCriterionMutation_createFeatureUsageScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion | CreateFeatureUsageScenarioCodingAutomatedCriterionMutation_createFeatureUsageScenarioCodingAutomatedCriterion_FeatureUsageScenarioCodingAutomatedCriterion;

export interface CreateFeatureUsageScenarioCodingAutomatedCriterionMutation {
  createFeatureUsageScenarioCodingAutomatedCriterion: CreateFeatureUsageScenarioCodingAutomatedCriterionMutation_createFeatureUsageScenarioCodingAutomatedCriterion;
}

export interface CreateFeatureUsageScenarioCodingAutomatedCriterionMutationVariables {
  creation: FeatureUsageScenarioCodingAutomatedCriterionCreation;
}
