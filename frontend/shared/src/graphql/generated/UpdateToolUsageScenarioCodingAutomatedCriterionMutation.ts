/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ToolUsageScenarioCodingAutomatedCriterionUpdate, OfficeTool, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateToolUsageScenarioCodingAutomatedCriterionMutation
// ====================================================

export interface UpdateToolUsageScenarioCodingAutomatedCriterionMutation_updateToolUsageScenarioCodingAutomatedCriterion_FeatureUsageScenarioCodingAutomatedCriterion {
  __typename: "FeatureUsageScenarioCodingAutomatedCriterion" | "RScriptScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
}

export interface UpdateToolUsageScenarioCodingAutomatedCriterionMutation_updateToolUsageScenarioCodingAutomatedCriterion_ToolUsageScenarioCodingAutomatedCriterion {
  __typename: "ToolUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  officeTool: OfficeTool;
}

export interface UpdateToolUsageScenarioCodingAutomatedCriterionMutation_updateToolUsageScenarioCodingAutomatedCriterion_InputValueScenarioCodingAutomatedCriterion {
  __typename: "InputValueScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  officeTool: OfficeTool;
  fileId: string | null;
  spreadsheetRowIndex: number | null;
  spreadsheetColumnIndex: number | null;
  value: string;
}

export interface UpdateToolUsageScenarioCodingAutomatedCriterionMutation_updateToolUsageScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion {
  __typename: "DocumentViewScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  fileId: string | null;
  emailId: string | null;
  erpRowId: number | null;
  erpTableType: ErpTableType | null;
  referenceBookArticleId: string | null;
}

export type UpdateToolUsageScenarioCodingAutomatedCriterionMutation_updateToolUsageScenarioCodingAutomatedCriterion = UpdateToolUsageScenarioCodingAutomatedCriterionMutation_updateToolUsageScenarioCodingAutomatedCriterion_FeatureUsageScenarioCodingAutomatedCriterion | UpdateToolUsageScenarioCodingAutomatedCriterionMutation_updateToolUsageScenarioCodingAutomatedCriterion_ToolUsageScenarioCodingAutomatedCriterion | UpdateToolUsageScenarioCodingAutomatedCriterionMutation_updateToolUsageScenarioCodingAutomatedCriterion_InputValueScenarioCodingAutomatedCriterion | UpdateToolUsageScenarioCodingAutomatedCriterionMutation_updateToolUsageScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion;

export interface UpdateToolUsageScenarioCodingAutomatedCriterionMutation {
  updateToolUsageScenarioCodingAutomatedCriterion: UpdateToolUsageScenarioCodingAutomatedCriterionMutation_updateToolUsageScenarioCodingAutomatedCriterion;
}

export interface UpdateToolUsageScenarioCodingAutomatedCriterionMutationVariables {
  id: string;
  update: ToolUsageScenarioCodingAutomatedCriterionUpdate;
}
