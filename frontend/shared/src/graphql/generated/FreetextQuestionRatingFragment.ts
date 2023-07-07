/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FreetextQuestionRatingFragment
// ====================================================

export interface FreetextQuestionRatingFragment_criterionSelections {
  __typename: "FreetextQuestionRatingCriterionSelection";
  createdAt: string;
  freetextQuestionRatingId: string;
  criterionId: string;
}

export interface FreetextQuestionRatingFragment {
  __typename: "FreetextQuestionRating";
  id: string;
  createdAt: string;
  modifiedAt: string;
  questionId: string;
  surveyInvitationId: string;
  noCriterionFulfilled: boolean;
  ratingId: string;
  criterionSelections: FreetextQuestionRatingFragment_criterionSelections[];
}
