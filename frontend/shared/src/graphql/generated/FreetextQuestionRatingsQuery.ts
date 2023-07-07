/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FreetextQuestionRatingsQuery
// ====================================================

export interface FreetextQuestionRatingsQuery_freetextQuestionRatings_criterionSelections {
  __typename: "FreetextQuestionRatingCriterionSelection";
  createdAt: string;
  freetextQuestionRatingId: string;
  criterionId: string;
}

export interface FreetextQuestionRatingsQuery_freetextQuestionRatings {
  __typename: "FreetextQuestionRating";
  id: string;
  createdAt: string;
  modifiedAt: string;
  questionId: string;
  surveyInvitationId: string;
  noCriterionFulfilled: boolean;
  ratingId: string;
  criterionSelections: FreetextQuestionRatingsQuery_freetextQuestionRatings_criterionSelections[];
}

export interface FreetextQuestionRatingsQuery {
  freetextQuestionRatings: FreetextQuestionRatingsQuery_freetextQuestionRatings[];
}

export interface FreetextQuestionRatingsQueryVariables {
  ratingId: string;
}
