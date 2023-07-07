/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AutomatedCodingItemUpdate, ScoringType, AutomatedCodingItemRule } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateAutomatedCodingItemMutation
// ====================================================

export interface UpdateAutomatedCodingItemMutation_updateAutomatedCodingItem_ManualCodingItem {
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

export interface UpdateAutomatedCodingItemMutation_updateAutomatedCodingItem_AutomatedCodingItem {
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

export type UpdateAutomatedCodingItemMutation_updateAutomatedCodingItem = UpdateAutomatedCodingItemMutation_updateAutomatedCodingItem_ManualCodingItem | UpdateAutomatedCodingItemMutation_updateAutomatedCodingItem_AutomatedCodingItem;

export interface UpdateAutomatedCodingItemMutation {
  updateAutomatedCodingItem: UpdateAutomatedCodingItemMutation_updateAutomatedCodingItem;
}

export interface UpdateAutomatedCodingItemMutationVariables {
  id: string;
  update: AutomatedCodingItemUpdate;
}
