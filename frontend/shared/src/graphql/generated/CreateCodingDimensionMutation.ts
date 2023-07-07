/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CodingDimensionCreation, ScoringType, AutomatedCodingItemRule } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCodingDimensionMutation
// ====================================================

export interface CreateCodingDimensionMutation_createCodingDimension_items_ManualCodingItem {
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

export interface CreateCodingDimensionMutation_createCodingDimension_items_AutomatedCodingItem {
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

export type CreateCodingDimensionMutation_createCodingDimension_items = CreateCodingDimensionMutation_createCodingDimension_items_ManualCodingItem | CreateCodingDimensionMutation_createCodingDimension_items_AutomatedCodingItem;

export interface CreateCodingDimensionMutation_createCodingDimension {
  __typename: "CodingDimension";
  id: string;
  createdAt: string;
  modifiedAt: string;
  title: string;
  description: string;
  codingModelId: string;
  parentDimensionId: string | null;
  position: number;
  items: CreateCodingDimensionMutation_createCodingDimension_items[];
}

export interface CreateCodingDimensionMutation {
  createCodingDimension: CreateCodingDimensionMutation_createCodingDimension;
}

export interface CreateCodingDimensionMutationVariables {
  creation: CodingDimensionCreation;
}
