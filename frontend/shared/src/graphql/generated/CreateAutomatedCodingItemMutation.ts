/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AutomatedCodingItemCreation, ScoringType, AutomatedCodingItemRule } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateAutomatedCodingItemMutation
// ====================================================

export interface CreateAutomatedCodingItemMutation_createAutomatedCodingItem_ManualCodingItem {
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

export interface CreateAutomatedCodingItemMutation_createAutomatedCodingItem_AutomatedCodingItem {
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

export type CreateAutomatedCodingItemMutation_createAutomatedCodingItem = CreateAutomatedCodingItemMutation_createAutomatedCodingItem_ManualCodingItem | CreateAutomatedCodingItemMutation_createAutomatedCodingItem_AutomatedCodingItem;

export interface CreateAutomatedCodingItemMutation {
  createAutomatedCodingItem: CreateAutomatedCodingItemMutation_createAutomatedCodingItem;
}

export interface CreateAutomatedCodingItemMutationVariables {
  creation: AutomatedCodingItemCreation;
}
