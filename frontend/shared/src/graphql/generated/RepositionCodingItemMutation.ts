/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScoringType, AutomatedCodingItemRule } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: RepositionCodingItemMutation
// ====================================================

export interface RepositionCodingItemMutation_repositionCodingItem_ManualCodingItem {
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
}

export interface RepositionCodingItemMutation_repositionCodingItem_AutomatedCodingItem {
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
  rule: AutomatedCodingItemRule;
}

export type RepositionCodingItemMutation_repositionCodingItem = RepositionCodingItemMutation_repositionCodingItem_ManualCodingItem | RepositionCodingItemMutation_repositionCodingItem_AutomatedCodingItem;

export interface RepositionCodingItemMutation {
  repositionCodingItem: RepositionCodingItemMutation_repositionCodingItem;
}

export interface RepositionCodingItemMutationVariables {
  id: string;
  predecessorId?: string | null;
}
