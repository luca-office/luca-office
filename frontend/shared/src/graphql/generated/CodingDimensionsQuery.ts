/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScoringType, AutomatedCodingItemRule } from "./globalTypes";

// ====================================================
// GraphQL query operation: CodingDimensionsQuery
// ====================================================

export interface CodingDimensionsQuery_codingDimensions_items_ManualCodingItem {
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

export interface CodingDimensionsQuery_codingDimensions_items_AutomatedCodingItem {
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

export type CodingDimensionsQuery_codingDimensions_items = CodingDimensionsQuery_codingDimensions_items_ManualCodingItem | CodingDimensionsQuery_codingDimensions_items_AutomatedCodingItem;

export interface CodingDimensionsQuery_codingDimensions {
  __typename: "CodingDimension";
  id: string;
  createdAt: string;
  modifiedAt: string;
  title: string;
  description: string;
  codingModelId: string;
  parentDimensionId: string | null;
  position: number;
  items: CodingDimensionsQuery_codingDimensions_items[];
}

export interface CodingDimensionsQuery {
  codingDimensions: CodingDimensionsQuery_codingDimensions[];
}

export interface CodingDimensionsQueryVariables {
  modelId: string;
}
