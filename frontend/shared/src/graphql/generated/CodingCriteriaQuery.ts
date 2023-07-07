/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CodingCriteriaQuery
// ====================================================

export interface CodingCriteriaQuery_codingCriteria {
  __typename: "CodingCriterion";
  id: string;
  createdAt: string;
  description: string;
  score: number;
  itemId: string;
}

export interface CodingCriteriaQuery {
  codingCriteria: CodingCriteriaQuery_codingCriteria[];
}

export interface CodingCriteriaQueryVariables {
  itemId: string;
}
