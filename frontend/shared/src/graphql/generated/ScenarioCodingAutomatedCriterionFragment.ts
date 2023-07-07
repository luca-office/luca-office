/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OfficeTool, ErpTableType, FeatureType } from "./globalTypes";

// ====================================================
// GraphQL fragment: ScenarioCodingAutomatedCriterionFragment
// ====================================================

export interface ScenarioCodingAutomatedCriterionFragment_ToolUsageScenarioCodingAutomatedCriterion {
  __typename: "ToolUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  officeTool: OfficeTool;
}

export interface ScenarioCodingAutomatedCriterionFragment_InputValueScenarioCodingAutomatedCriterion {
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

export interface ScenarioCodingAutomatedCriterionFragment_DocumentViewScenarioCodingAutomatedCriterion {
  __typename: "DocumentViewScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  fileId: string | null;
  emailId: string | null;
  erpRowId: number | null;
  erpTableType: ErpTableType | null;
  referenceBookArticleId: string | null;
  sampleCompanyId: string | null;
}

export interface ScenarioCodingAutomatedCriterionFragment_FeatureUsageScenarioCodingAutomatedCriterion {
  __typename: "FeatureUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  officeTool: OfficeTool;
  featureType: FeatureType;
}

export interface ScenarioCodingAutomatedCriterionFragment_RScriptScenarioCodingAutomatedCriterion {
  __typename: "RScriptScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  rScriptId: string;
}

export type ScenarioCodingAutomatedCriterionFragment = ScenarioCodingAutomatedCriterionFragment_ToolUsageScenarioCodingAutomatedCriterion | ScenarioCodingAutomatedCriterionFragment_InputValueScenarioCodingAutomatedCriterion | ScenarioCodingAutomatedCriterionFragment_DocumentViewScenarioCodingAutomatedCriterion | ScenarioCodingAutomatedCriterionFragment_FeatureUsageScenarioCodingAutomatedCriterion | ScenarioCodingAutomatedCriterionFragment_RScriptScenarioCodingAutomatedCriterion;
