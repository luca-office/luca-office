/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CodingCriterionCreation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCodingCriterionMutation
// ====================================================

export interface CreateCodingCriterionMutation_createCodingCriterion {
  __typename: "CodingCriterion";
  id: string;
  createdAt: string;
  description: string;
  score: number;
  itemId: string;
}

export interface CreateCodingCriterionMutation {
  createCodingCriterion: CreateCodingCriterionMutation_createCodingCriterion;
}

export interface CreateCodingCriterionMutationVariables {
  creation: CodingCriterionCreation;
}
