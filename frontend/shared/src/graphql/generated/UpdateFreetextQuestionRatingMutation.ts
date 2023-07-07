/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FreetextQuestionRatingUpdate } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateFreetextQuestionRatingMutation
// ====================================================

export interface UpdateFreetextQuestionRatingMutation_updateFreetextQuestionRating_criterionSelections {
  __typename: "FreetextQuestionRatingCriterionSelection";
  createdAt: string;
  freetextQuestionRatingId: string;
  criterionId: string;
}

export interface UpdateFreetextQuestionRatingMutation_updateFreetextQuestionRating {
  __typename: "FreetextQuestionRating";
  id: string;
  createdAt: string;
  modifiedAt: string;
  questionId: string;
  surveyInvitationId: string;
  noCriterionFulfilled: boolean;
  ratingId: string;
  criterionSelections: UpdateFreetextQuestionRatingMutation_updateFreetextQuestionRating_criterionSelections[];
}

export interface UpdateFreetextQuestionRatingMutation {
  updateFreetextQuestionRating: UpdateFreetextQuestionRatingMutation_updateFreetextQuestionRating;
}

export interface UpdateFreetextQuestionRatingMutationVariables {
  id: string;
  update: FreetextQuestionRatingUpdate;
}
