/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScoringType, AutomatedCodingItemRule } from "./globalTypes";

// ====================================================
// GraphQL query operation: CodingItemsQuery
// ====================================================

export interface CodingItemsQuery_codingItems_ManualCodingItem {
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

export interface CodingItemsQuery_codingItems_AutomatedCodingItem {
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

export type CodingItemsQuery_codingItems = CodingItemsQuery_codingItems_ManualCodingItem | CodingItemsQuery_codingItems_AutomatedCodingItem;

export interface CodingItemsQuery {
  codingItems: CodingItemsQuery_codingItems[];
}

export interface CodingItemsQueryVariables {
  dimensionId: string;
}
