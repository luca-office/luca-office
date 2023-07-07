/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DocumentViewScenarioCodingAutomatedCriterionCreation, ErpTableType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateDocumentViewScenarioCodingAutomatedCriterionMutation
// ====================================================

export interface CreateDocumentViewScenarioCodingAutomatedCriterionMutation_createDocumentViewScenarioCodingAutomatedCriterion_FeatureUsageScenarioCodingAutomatedCriterion {
  __typename: "FeatureUsageScenarioCodingAutomatedCriterion" | "InputValueScenarioCodingAutomatedCriterion" | "RScriptScenarioCodingAutomatedCriterion" | "ToolUsageScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
}

export interface CreateDocumentViewScenarioCodingAutomatedCriterionMutation_createDocumentViewScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion {
  __typename: "DocumentViewScenarioCodingAutomatedCriterion";
  id: string;
  score: number;
  itemId: string;
  erpRowId: number | null;
  fileId: string | null;
  emailId: string | null;
  referenceBookArticleId: string | null;
  erpTableType: ErpTableType | null;
  sampleCompanyId: string | null;
}

export type CreateDocumentViewScenarioCodingAutomatedCriterionMutation_createDocumentViewScenarioCodingAutomatedCriterion = CreateDocumentViewScenarioCodingAutomatedCriterionMutation_createDocumentViewScenarioCodingAutomatedCriterion_FeatureUsageScenarioCodingAutomatedCriterion | CreateDocumentViewScenarioCodingAutomatedCriterionMutation_createDocumentViewScenarioCodingAutomatedCriterion_DocumentViewScenarioCodingAutomatedCriterion;

export interface CreateDocumentViewScenarioCodingAutomatedCriterionMutation {
  createDocumentViewScenarioCodingAutomatedCriterion: CreateDocumentViewScenarioCodingAutomatedCriterionMutation_createDocumentViewScenarioCodingAutomatedCriterion;
}

export interface CreateDocumentViewScenarioCodingAutomatedCriterionMutationVariables {
  creation: DocumentViewScenarioCodingAutomatedCriterionCreation;
}
