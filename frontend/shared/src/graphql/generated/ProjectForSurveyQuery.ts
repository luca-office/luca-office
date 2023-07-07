/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectForSurveyQuery
// ====================================================

export interface ProjectForSurveyQuery_projectForSurvey {
  __typename: "Project";
  name: string;
}

export interface ProjectForSurveyQuery {
  projectForSurvey: ProjectForSurveyQuery_projectForSurvey | null;
}

export interface ProjectForSurveyQueryVariables {
  surveyId: string;
}
