/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScoringType, AutomatedCodingItemRule } from "./globalTypes";

// ====================================================
// GraphQL query operation: CodingDimensionQuery
// ====================================================

export interface CodingDimensionQuery_codingDimension_items_ManualCodingItem {
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

export interface CodingDimensionQuery_codingDimension_items_AutomatedCodingItem {
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

export type CodingDimensionQuery_codingDimension_items = CodingDimensionQuery_codingDimension_items_ManualCodingItem | CodingDimensionQuery_codingDimension_items_AutomatedCodingItem;

export interface CodingDimensionQuery_codingDimension {
  __typename: "CodingDimension";
  id: string;
  createdAt: string;
  modifiedAt: string;
  title: string;
  description: string;
  codingModelId: string;
  parentDimensionId: string | null;
  position: number;
  items: CodingDimensionQuery_codingDimension_items[];
}

export interface CodingDimensionQuery {
  codingDimension: CodingDimensionQuery_codingDimension | null;
}

export interface CodingDimensionQueryVariables {
  id: string;
}
