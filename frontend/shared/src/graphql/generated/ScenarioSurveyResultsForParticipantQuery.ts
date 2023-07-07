/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ScenarioSurveyResultsForParticipantQuery
// ====================================================

export interface ScenarioSurveyResultsForParticipantQuery_scenarioSurveyResultsForParticipant_codingItemResults {
  __typename: "ParticipantCodingItemSurveyResult";
  itemId: string;
  score: number;
  maximumScore: number;
  averageScore: number;
  selectedCriteriaIds: string[];
  noCriterionFulfilled: boolean;
}

export interface ScenarioSurveyResultsForParticipantQuery_scenarioSurveyResultsForParticipant {
  __typename: "ParticipantScenarioSurveyResult";
  surveyInvitationId: string;
  scenarioId: string;
  codingItemResults: ScenarioSurveyResultsForParticipantQuery_scenarioSurveyResultsForParticipant_codingItemResults[];
}

export interface ScenarioSurveyResultsForParticipantQuery {
  scenarioSurveyResultsForParticipant: ScenarioSurveyResultsForParticipantQuery_scenarioSurveyResultsForParticipant;
}

export interface ScenarioSurveyResultsForParticipantQueryVariables {
  surveyId: string;
  surveyInvitationId: string;
  scenarioId: string;
}
