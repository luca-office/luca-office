/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FreetextQuestionCodingCriterionCreation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateFreetextQuestionCodingCriterionMutation
// ====================================================

export interface CreateFreetextQuestionCodingCriterionMutation_createFreetextQuestionCodingCriterion {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface CreateFreetextQuestionCodingCriterionMutation {
  createFreetextQuestionCodingCriterion: CreateFreetextQuestionCodingCriterionMutation_createFreetextQuestionCodingCriterion;
}

export interface CreateFreetextQuestionCodingCriterionMutationVariables {
  creation: FreetextQuestionCodingCriterionCreation;
}
