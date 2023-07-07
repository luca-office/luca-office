/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SurveyResultsOverviewQuery
// ====================================================

export interface SurveyResultsOverviewQuery_surveyResultsOverview_participantResults {
  __typename: "ParticipantResult";
  surveyInvitationId: string;
  participantName: string | null;
  score: number;
  isComplete: boolean;
}

export interface SurveyResultsOverviewQuery_surveyResultsOverview_projectModuleResults {
  __typename: "ProjectModuleResult";
  scenarioId: string | null;
  questionnaireId: string | null;
  averageScore: number;
  maximumScore: number;
  isComplete: boolean;
}

export interface SurveyResultsOverviewQuery_surveyResultsOverview {
  __typename: "SurveyResultsOverview";
  surveyId: string;
  participantResults: SurveyResultsOverviewQuery_surveyResultsOverview_participantResults[];
  projectModuleResults: SurveyResultsOverviewQuery_surveyResultsOverview_projectModuleResults[];
  averageScore: number | null;
  maximumScore: number;
  areResultsComplete: boolean;
}

export interface SurveyResultsOverviewQuery {
  surveyResultsOverview: SurveyResultsOverviewQuery_surveyResultsOverview;
}

export interface SurveyResultsOverviewQueryVariables {
  surveyId: string;
}
