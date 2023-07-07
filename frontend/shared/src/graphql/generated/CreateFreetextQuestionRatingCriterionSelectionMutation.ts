/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FreetextQuestionRatingCriterionSelectionCreation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateFreetextQuestionRatingCriterionSelectionMutation
// ====================================================

export interface CreateFreetextQuestionRatingCriterionSelectionMutation_createFreetextQuestionRatingCriterionSelection {
  __typename: "FreetextQuestionRatingCriterionSelection";
  createdAt: string;
  freetextQuestionRatingId: string;
  criterionId: string;
}

export interface CreateFreetextQuestionRatingCriterionSelectionMutation {
  createFreetextQuestionRatingCriterionSelection: CreateFreetextQuestionRatingCriterionSelectionMutation_createFreetextQuestionRatingCriterionSelection;
}

export interface CreateFreetextQuestionRatingCriterionSelectionMutationVariables {
  creation: FreetextQuestionRatingCriterionSelectionCreation;
}
