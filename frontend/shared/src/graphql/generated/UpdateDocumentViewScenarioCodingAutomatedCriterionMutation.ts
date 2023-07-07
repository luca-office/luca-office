/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DocumentViewScenarioCodingAutomatedCriterionUpdate, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateDocumentViewScenarioCodingAutomatedCriterionMutation
// ====================================================

export interface UpdateDocumentViewScenarioCodingAutomatedCriterionMutation_updateDocumentViewScenarioCodingAutomatedCriterion_FeatureUsageScenarioCodingAutomatedCriterion {
  __typename: "FeatureUsageScenarioCodingAutomatedCriterion" | "InputValueScenarioCodingAutomatedCriterion" | "RScriptScenarioCodingAutomatedCriterion" | "ToolUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
}

export interface UpdateDocumentViewScenarioCodingAutomatedCriterionMutation_updateDocumentViewScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion {
  __typename: "DocumentViewScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  erpRowId: number | null;
  fileId: string | null;
  emailId: string | null;
  referenceBookArticleId: string | null;
  erpTableType: ErpTableType | null;
}

export type UpdateDocumentViewScenarioCodingAutomatedCriterionMutation_updateDocumentViewScenarioCodingAutomatedCriterion = UpdateDocumentViewScenarioCodingAutomatedCriterionMutation_updateDocumentViewScenarioCodingAutomatedCriterion_FeatureUsageScenarioCodingAutomatedCriterion | UpdateDocumentViewScenarioCodingAutomatedCriterionMutation_updateDocumentViewScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion;

export interface UpdateDocumentViewScenarioCodingAutomatedCriterionMutation {
  updateDocumentViewScenarioCodingAutomatedCriterion: UpdateDocumentViewScenarioCodingAutomatedCriterionMutation_updateDocumentViewScenarioCodingAutomatedCriterion;
}

export interface UpdateDocumentViewScenarioCodingAutomatedCriterionMutationVariables {
  id: string;
  update: DocumentViewScenarioCodingAutomatedCriterionUpdate;
}
