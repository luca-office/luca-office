/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ToolUsageScenarioCodingAutomatedCriterionCreation, OfficeTool, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateToolUsageScenarioCodingAutomatedCriterionMutation
// ====================================================

export interface CreateToolUsageScenarioCodingAutomatedCriterionMutation_createToolUsageScenarioCodingAutomatedCriterion_FeatureUsageScenarioCodingAutomatedCriterion {
  __typename: "FeatureUsageScenarioCodingAutomatedCriterion" | "RScriptScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
}

export interface CreateToolUsageScenarioCodingAutomatedCriterionMutation_createToolUsageScenarioCodingAutomatedCriterion_ToolUsageScenarioCodingAutomatedCriterion {
  __typename: "ToolUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  officeTool: OfficeTool;
}

export interface CreateToolUsageScenarioCodingAutomatedCriterionMutation_createToolUsageScenarioCodingAutomatedCriterion_InputValueScenarioCodingAutomatedCriterion {
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

export interface CreateToolUsageScenarioCodingAutomatedCriterionMutation_createToolUsageScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion {
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

export type CreateToolUsageScenarioCodingAutomatedCriterionMutation_createToolUsageScenarioCodingAutomatedCriterion = CreateToolUsageScenarioCodingAutomatedCriterionMutation_createToolUsageScenarioCodingAutomatedCriterion_FeatureUsageScenarioCodingAutomatedCriterion | CreateToolUsageScenarioCodingAutomatedCriterionMutation_createToolUsageScenarioCodingAutomatedCriterion_ToolUsageScenarioCodingAutomatedCriterion | CreateToolUsageScenarioCodingAutomatedCriterionMutation_createToolUsageScenarioCodingAutomatedCriterion_InputValueScenarioCodingAutomatedCriterion | CreateToolUsageScenarioCodingAutomatedCriterionMutation_createToolUsageScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion;

export interface CreateToolUsageScenarioCodingAutomatedCriterionMutation {
  createToolUsageScenarioCodingAutomatedCriterion: CreateToolUsageScenarioCodingAutomatedCriterionMutation_createToolUsageScenarioCodingAutomatedCriterion;
}

export interface CreateToolUsageScenarioCodingAutomatedCriterionMutationVariables {
  creation: ToolUsageScenarioCodingAutomatedCriterionCreation;
}
