/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScoringType, AutomatedCodingItemRule } from "./globalTypes";

// ====================================================
// GraphQL query operation: CodingItemQuery
// ====================================================

export interface CodingItemQuery_codingItem_ManualCodingItem {
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

export interface CodingItemQuery_codingItem_AutomatedCodingItem {
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

export type CodingItemQuery_codingItem = CodingItemQuery_codingItem_ManualCodingItem | CodingItemQuery_codingItem_AutomatedCodingItem;

export interface CodingItemQuery {
  codingItem: CodingItemQuery_codingItem | null;
}

export interface CodingItemQueryVariables {
  id: string;
}
