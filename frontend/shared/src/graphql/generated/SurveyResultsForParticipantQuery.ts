/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SurveyResultsForParticipantQuery
// ====================================================

export interface SurveyResultsForParticipantQuery_surveyResultsForParticipant_projectModuleScores_ScenarioScore {
  __typename: "ScenarioScore";
  score: number | null;
  maximumScore: number;
  scenarioId: string;
  isComplete: boolean;
}

export interface SurveyResultsForParticipantQuery_surveyResultsForParticipant_projectModuleScores_QuestionnaireScore {
  __typename: "QuestionnaireScore";
  score: number | null;
  maximumScore: number;
  questionnaireId: string;
  isComplete: boolean;
}

export type SurveyResultsForParticipantQuery_surveyResultsForParticipant_projectModuleScores = SurveyResultsForParticipantQuery_surveyResultsForParticipant_projectModuleScores_ScenarioScore | SurveyResultsForParticipantQuery_surveyResultsForParticipant_projectModuleScores_QuestionnaireScore;

export interface SurveyResultsForParticipantQuery_surveyResultsForParticipant {
  __typename: "ParticipantResults";
  surveyInvitationId: string;
  projectModuleScores: SurveyResultsForParticipantQuery_surveyResultsForParticipant_projectModuleScores[];
}

export interface SurveyResultsForParticipantQuery {
  surveyResultsForParticipant: SurveyResultsForParticipantQuery_surveyResultsForParticipant;
}

export interface SurveyResultsForParticipantQueryVariables {
  surveyId: string;
  surveyInvitationId: string;
}
