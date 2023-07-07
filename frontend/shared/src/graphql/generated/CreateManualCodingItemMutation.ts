/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ManualCodingItemCreation, ScoringType, AutomatedCodingItemRule } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateManualCodingItemMutation
// ====================================================

export interface CreateManualCodingItemMutation_createManualCodingItem_ManualCodingItem {
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

export interface CreateManualCodingItemMutation_createManualCodingItem_AutomatedCodingItem {
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

export type CreateManualCodingItemMutation_createManualCodingItem = CreateManualCodingItemMutation_createManualCodingItem_ManualCodingItem | CreateManualCodingItemMutation_createManualCodingItem_AutomatedCodingItem;

export interface CreateManualCodingItemMutation {
  createManualCodingItem: CreateManualCodingItemMutation_createManualCodingItem;
}

export interface CreateManualCodingItemMutationVariables {
  creation: ManualCodingItemCreation;
}
