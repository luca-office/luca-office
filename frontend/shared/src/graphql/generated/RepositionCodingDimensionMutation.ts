/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScoringType, AutomatedCodingItemRule } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: RepositionCodingDimensionMutation
// ====================================================

export interface RepositionCodingDimensionMutation_repositionCodingDimension_items_ManualCodingItem {
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

export interface RepositionCodingDimensionMutation_repositionCodingDimension_items_AutomatedCodingItem {
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

export type RepositionCodingDimensionMutation_repositionCodingDimension_items = RepositionCodingDimensionMutation_repositionCodingDimension_items_ManualCodingItem | RepositionCodingDimensionMutation_repositionCodingDimension_items_AutomatedCodingItem;

export interface RepositionCodingDimensionMutation_repositionCodingDimension {
  __typename: "CodingDimension";
  id: string;
  createdAt: string;
  modifiedAt: string;
  title: string;
  description: string;
  codingModelId: string;
  parentDimensionId: string | null;
  position: number;
  items: RepositionCodingDimensionMutation_repositionCodingDimension_items[];
}

export interface RepositionCodingDimensionMutation {
  repositionCodingDimension: RepositionCodingDimensionMutation_repositionCodingDimension;
}

export interface RepositionCodingDimensionMutationVariables {
  id: string;
  predecessorId?: string | null;
}
