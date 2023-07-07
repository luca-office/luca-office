/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CodingDimensionUpdate, ScoringType, AutomatedCodingItemRule } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCodingDimensionMutation
// ====================================================

export interface UpdateCodingDimensionMutation_updateCodingDimension_items_ManualCodingItem {
  __typename: "ManualCodingItem";
  id: string;
  createdAt: string;
  modifiedAt: string;
  title: string;
  description: string;
  scoringType: ScoringType;
  dimensionId: string;
  position: number;
  maximumScore: number;
  criteriaCount: number;
}

export interface UpdateCodingDimensionMutation_updateCodingDimension_items_AutomatedCodingItem {
  __typename: "AutomatedCodingItem";
  id: string;
  createdAt: string;
  modifiedAt: string;
  title: string;
  description: string;
  scoringType: ScoringType;
  dimensionId: string;
  position: number;
  maximumScore: number;
  criteriaCount: number;
  rule: AutomatedCodingItemRule;
}

export type UpdateCodingDimensionMutation_updateCodingDimension_items = UpdateCodingDimensionMutation_updateCodingDimension_items_ManualCodingItem | UpdateCodingDimensionMutation_updateCodingDimension_items_AutomatedCodingItem;

export interface UpdateCodingDimensionMutation_updateCodingDimension {
  __typename: "CodingDimension";
  id: string;
  createdAt: string;
  modifiedAt: string;
  title: string;
  description: string;
  codingModelId: string;
  parentDimensionId: string | null;
  position: number;
  items: UpdateCodingDimensionMutation_updateCodingDimension_items[];
}

export interface UpdateCodingDimensionMutation {
  updateCodingDimension: UpdateCodingDimensionMutation_updateCodingDimension;
}

export interface UpdateCodingDimensionMutationVariables {
  id: string;
  update: CodingDimensionUpdate;
}
