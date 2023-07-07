/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OfficeTool, ErpTableType, FeatureType } from "./globalTypes";

// ====================================================
// GraphQL query operation: ScenarioCodingAutomatedCriteriaQuery
// ====================================================

export interface ScenarioCodingAutomatedCriteriaQuery_scenarioCodingAutomatedCriteria_ToolUsageScenarioCodingAutomatedCriterion {
  __typename: "ToolUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  officeTool: OfficeTool;
}

export interface ScenarioCodingAutomatedCriteriaQuery_scenarioCodingAutomatedCriteria_InputValueScenarioCodingAutomatedCriterion {
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

export interface ScenarioCodingAutomatedCriteriaQuery_scenarioCodingAutomatedCriteria_DocumentViewScenarioCodingAutomatedCriterion {
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

export interface ScenarioCodingAutomatedCriteriaQuery_scenarioCodingAutomatedCriteria_FeatureUsageScenarioCodingAutomatedCriterion {
  __typename: "FeatureUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  officeTool: OfficeTool;
  featureType: FeatureType;
}

export interface ScenarioCodingAutomatedCriteriaQuery_scenarioCodingAutomatedCriteria_RScriptScenarioCodingAutomatedCriterion {
  __typename: "RScriptScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  rScriptId: string;
}

export type ScenarioCodingAutomatedCriteriaQuery_scenarioCodingAutomatedCriteria = ScenarioCodingAutomatedCriteriaQuery_scenarioCodingAutomatedCriteria_ToolUsageScenarioCodingAutomatedCriterion | ScenarioCodingAutomatedCriteriaQuery_scenarioCodingAutomatedCriteria_InputValueScenarioCodingAutomatedCriterion | ScenarioCodingAutomatedCriteriaQuery_scenarioCodingAutomatedCriteria_DocumentViewScenarioCodingAutomatedCriterion | ScenarioCodingAutomatedCriteriaQuery_scenarioCodingAutomatedCriteria_FeatureUsageScenarioCodingAutomatedCriterion | ScenarioCodingAutomatedCriteriaQuery_scenarioCodingAutomatedCriteria_RScriptScenarioCodingAutomatedCriterion;

export interface ScenarioCodingAutomatedCriteriaQuery {
  scenarioCodingAutomatedCriteria: ScenarioCodingAutomatedCriteriaQuery_scenarioCodingAutomatedCriteria[];
}

export interface ScenarioCodingAutomatedCriteriaQueryVariables {
  itemId: string;
}
