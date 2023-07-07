/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ScenarioCodingItemRatingsForParticipantQuery
// ====================================================

export interface ScenarioCodingItemRatingsForParticipantQuery_scenarioCodingItemRatingsForParticipant_criterionSelections {
  __typename: "ScenarioRatingCriterionSelection";
  createdAt: string;
  manualCriterionId: string | null;
  automatedCriterionId: string | null;
  scenarioCodingItemRatingId: string;
}

export interface ScenarioCodingItemRatingsForParticipantQuery_scenarioCodingItemRatingsForParticipant {
  __typename: "ScenarioCodingItemRating";
  id: string;
  createdAt: string;
  modifiedAt: string;
  noCriterionFulfilled: boolean;
  surveyInvitationId: string;
  ratingId: string;
  codingItemId: string;
  criterionSelections: ScenarioCodingItemRatingsForParticipantQuery_scenarioCodingItemRatingsForParticipant_criterionSelections[];
}

export interface ScenarioCodingItemRatingsForParticipantQuery {
  scenarioCodingItemRatingsForParticipant: ScenarioCodingItemRatingsForParticipantQuery_scenarioCodingItemRatingsForParticipant[];
}

export interface ScenarioCodingItemRatingsForParticipantQueryVariables {
  scenarioId: string;
  surveyInvitationId: string;
}
