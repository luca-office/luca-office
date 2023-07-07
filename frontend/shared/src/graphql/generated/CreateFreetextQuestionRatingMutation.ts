/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FreetextQuestionRatingCreation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateFreetextQuestionRatingMutation
// ====================================================

export interface CreateFreetextQuestionRatingMutation_createFreetextQuestionRating_criterionSelections {
  __typename: "FreetextQuestionRatingCriterionSelection";
  createdAt: string;
  freetextQuestionRatingId: string;
  criterionId: string;
}

export interface CreateFreetextQuestionRatingMutation_createFreetextQuestionRating {
  __typename: "FreetextQuestionRating";
  id: string;
  createdAt: string;
  modifiedAt: string;
  questionId: string;
  surveyInvitationId: string;
  noCriterionFulfilled: boolean;
  ratingId: string;
  criterionSelections: CreateFreetextQuestionRatingMutation_createFreetextQuestionRating_criterionSelections[];
}

export interface CreateFreetextQuestionRatingMutation {
  createFreetextQuestionRating: CreateFreetextQuestionRatingMutation_createFreetextQuestionRating;
}

export interface CreateFreetextQuestionRatingMutationVariables {
  creation: FreetextQuestionRatingCreation;
}
