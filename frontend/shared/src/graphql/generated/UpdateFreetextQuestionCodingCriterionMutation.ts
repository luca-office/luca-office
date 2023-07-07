/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FreetextQuestionCodingCriterionUpdate } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateFreetextQuestionCodingCriterionMutation
// ====================================================

export interface UpdateFreetextQuestionCodingCriterionMutation_updateFreetextQuestionCodingCriterion {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface UpdateFreetextQuestionCodingCriterionMutation {
  updateFreetextQuestionCodingCriterion: UpdateFreetextQuestionCodingCriterionMutation_updateFreetextQuestionCodingCriterion;
}

export interface UpdateFreetextQuestionCodingCriterionMutationVariables {
  id: string;
  update: FreetextQuestionCodingCriterionUpdate;
}
