/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SurveyResultsForProjectModuleQuery
// ====================================================

export interface SurveyResultsForProjectModuleQuery_surveyResultsForProjectModule_participantResults {
  __typename: "ParticipantProjectModuleResult";
  surveyInvitationId: string;
  participantName: string | null;
  score: number | null;
}

export interface SurveyResultsForProjectModuleQuery_surveyResultsForProjectModule {
  __typename: "ProjectModuleResults";
  projectModuleId: string;
  participantResults: SurveyResultsForProjectModuleQuery_surveyResultsForProjectModule_participantResults[];
  averageScore: number | null;
  maximumScore: number;
}

export interface SurveyResultsForProjectModuleQuery {
  surveyResultsForProjectModule: SurveyResultsForProjectModuleQuery_surveyResultsForProjectModule;
}

export interface SurveyResultsForProjectModuleQueryVariables {
  surveyId: string;
  projectModuleId: string;
}
