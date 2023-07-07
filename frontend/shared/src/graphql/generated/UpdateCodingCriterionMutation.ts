/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CodingCriterionUpdate } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCodingCriterionMutation
// ====================================================

export interface UpdateCodingCriterionMutation_updateCodingCriterion {
  __typename: "CodingCriterion";
  id: string;
  createdAt: string;
  description: string;
  score: number;
  itemId: string;
}

export interface UpdateCodingCriterionMutation {
  updateCodingCriterion: UpdateCodingCriterionMutation_updateCodingCriterion;
}

export interface UpdateCodingCriterionMutationVariables {
  id: string;
  update: CodingCriterionUpdate;
}
