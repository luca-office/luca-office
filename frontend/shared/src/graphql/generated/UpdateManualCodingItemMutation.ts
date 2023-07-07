/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ManualCodingItemUpdate, ScoringType, AutomatedCodingItemRule } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateManualCodingItemMutation
// ====================================================

export interface UpdateManualCodingItemMutation_updateManualCodingItem_ManualCodingItem {
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

export interface UpdateManualCodingItemMutation_updateManualCodingItem_AutomatedCodingItem {
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

export type UpdateManualCodingItemMutation_updateManualCodingItem = UpdateManualCodingItemMutation_updateManualCodingItem_ManualCodingItem | UpdateManualCodingItemMutation_updateManualCodingItem_AutomatedCodingItem;

export interface UpdateManualCodingItemMutation {
  updateManualCodingItem: UpdateManualCodingItemMutation_updateManualCodingItem;
}

export interface UpdateManualCodingItemMutationVariables {
  id: string;
  update: ManualCodingItemUpdate;
}
