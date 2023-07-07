/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SurveyResultsOverviewFragment
// ====================================================

export interface SurveyResultsOverviewFragment_participantResults {
  __typename: "ParticipantResult";
  surveyInvitationId: string;
  participantName: string | null;
  score: number;
  isComplete: boolean;
}

export interface SurveyResultsOverviewFragment_projectModuleResults {
  __typename: "ProjectModuleResult";
  scenarioId: string | null;
  questionnaireId: string | null;
  averageScore: number;
  maximumScore: number;
  isComplete: boolean;
}

export interface SurveyResultsOverviewFragment {
  __typename: "SurveyResultsOverview";
  surveyId: string;
  participantResults: SurveyResultsOverviewFragment_participantResults[];
  projectModuleResults: SurveyResultsOverviewFragment_projectModuleResults[];
  averageScore: number | null;
  maximumScore: number;
  areResultsComplete: boolean;
}
