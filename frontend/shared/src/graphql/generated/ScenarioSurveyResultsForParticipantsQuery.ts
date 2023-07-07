/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ScenarioSurveyResultsForParticipantsQuery
// ====================================================

export interface ScenarioSurveyResultsForParticipantsQuery_scenarioSurveyResultsForParticipants_codingItemResults {
  __typename: "ParticipantCodingItemSurveyResult";
  itemId: string;
  score: number;
  maximumScore: number;
  averageScore: number;
  selectedCriteriaIds: string[];
  noCriterionFulfilled: boolean;
}

export interface ScenarioSurveyResultsForParticipantsQuery_scenarioSurveyResultsForParticipants {
  __typename: "ParticipantScenarioSurveyResult";
  surveyInvitationId: string;
  scenarioId: string;
  codingItemResults: ScenarioSurveyResultsForParticipantsQuery_scenarioSurveyResultsForParticipants_codingItemResults[];
}

export interface ScenarioSurveyResultsForParticipantsQuery {
  scenarioSurveyResultsForParticipants: ScenarioSurveyResultsForParticipantsQuery_scenarioSurveyResultsForParticipants[];
}

export interface ScenarioSurveyResultsForParticipantsQueryVariables {
  surveyId: string;
  scenarioId: string;
}
