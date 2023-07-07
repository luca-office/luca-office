/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InputValueScenarioCodingAutomatedCriterionUpdate, OfficeTool } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateInputValueScenarioCodingAutomatedCriterionMutation
// ====================================================

export interface UpdateInputValueScenarioCodingAutomatedCriterionMutation_updateInputValueScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion {
  __typename: "DocumentViewScenarioCodingAutomatedCriterion" | "FeatureUsageScenarioCodingAutomatedCriterion" | "RScriptScenarioCodingAutomatedCriterion" | "ToolUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
}

export interface UpdateInputValueScenarioCodingAutomatedCriterionMutation_updateInputValueScenarioCodingAutomatedCriterion_InputValueScenarioCodingAutomatedCriterion {
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

export type UpdateInputValueScenarioCodingAutomatedCriterionMutation_updateInputValueScenarioCodingAutomatedCriterion = UpdateInputValueScenarioCodingAutomatedCriterionMutation_updateInputValueScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion | UpdateInputValueScenarioCodingAutomatedCriterionMutation_updateInputValueScenarioCodingAutomatedCriterion_InputValueScenarioCodingAutomatedCriterion;

export interface UpdateInputValueScenarioCodingAutomatedCriterionMutation {
  updateInputValueScenarioCodingAutomatedCriterion: UpdateInputValueScenarioCodingAutomatedCriterionMutation_updateInputValueScenarioCodingAutomatedCriterion;
}

export interface UpdateInputValueScenarioCodingAutomatedCriterionMutationVariables {
  id: string;
  update: InputValueScenarioCodingAutomatedCriterionUpdate;
}
