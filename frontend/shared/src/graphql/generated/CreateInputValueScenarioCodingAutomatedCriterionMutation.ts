/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InputValueScenarioCodingAutomatedCriterionCreation, OfficeTool } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateInputValueScenarioCodingAutomatedCriterionMutation
// ====================================================

export interface CreateInputValueScenarioCodingAutomatedCriterionMutation_createInputValueScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion {
  __typename: "DocumentViewScenarioCodingAutomatedCriterion" | "FeatureUsageScenarioCodingAutomatedCriterion" | "RScriptScenarioCodingAutomatedCriterion" | "ToolUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
}

export interface CreateInputValueScenarioCodingAutomatedCriterionMutation_createInputValueScenarioCodingAutomatedCriterion_InputValueScenarioCodingAutomatedCriterion {
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

export type CreateInputValueScenarioCodingAutomatedCriterionMutation_createInputValueScenarioCodingAutomatedCriterion = CreateInputValueScenarioCodingAutomatedCriterionMutation_createInputValueScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion | CreateInputValueScenarioCodingAutomatedCriterionMutation_createInputValueScenarioCodingAutomatedCriterion_InputValueScenarioCodingAutomatedCriterion;

export interface CreateInputValueScenarioCodingAutomatedCriterionMutation {
  createInputValueScenarioCodingAutomatedCriterion: CreateInputValueScenarioCodingAutomatedCriterionMutation_createInputValueScenarioCodingAutomatedCriterion;
}

export interface CreateInputValueScenarioCodingAutomatedCriterionMutationVariables {
  creation: InputValueScenarioCodingAutomatedCriterionCreation;
}
