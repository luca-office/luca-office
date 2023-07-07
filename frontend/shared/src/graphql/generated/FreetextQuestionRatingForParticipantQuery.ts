/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FreetextQuestionRatingForParticipantQuery
// ====================================================

export interface FreetextQuestionRatingForParticipantQuery_freetextQuestionRatingForParticipant_criterionSelections {
  __typename: "FreetextQuestionRatingCriterionSelection";
  createdAt: string;
  freetextQuestionRatingId: string;
  criterionId: string;
}

export interface FreetextQuestionRatingForParticipantQuery_freetextQuestionRatingForParticipant {
  __typename: "FreetextQuestionRating";
  id: string;
  createdAt: string;
  modifiedAt: string;
  questionId: string;
  surveyInvitationId: string;
  noCriterionFulfilled: boolean;
  ratingId: string;
  criterionSelections: FreetextQuestionRatingForParticipantQuery_freetextQuestionRatingForParticipant_criterionSelections[];
}

export interface FreetextQuestionRatingForParticipantQuery {
  freetextQuestionRatingForParticipant: FreetextQuestionRatingForParticipantQuery_freetextQuestionRatingForParticipant | null;
}

export interface FreetextQuestionRatingForParticipantQueryVariables {
  questionId: string;
  surveyInvitationId: string;
}
