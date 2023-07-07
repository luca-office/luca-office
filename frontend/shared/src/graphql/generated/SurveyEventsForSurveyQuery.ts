/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SurveyEventType } from "./globalTypes";

// ====================================================
// GraphQL query operation: SurveyEventsForSurveyQuery
// ====================================================

export interface SurveyEventsForSurveyQuery_surveyEventsForSurvey {
  __typename: "SurveyEvent";
  timestamp: string;
  eventType: SurveyEventType;
  data: string | null;
  surveyId: string;
  index: number;
  invitationId: string | null;
}

export interface SurveyEventsForSurveyQuery {
  surveyEventsForSurvey: SurveyEventsForSurveyQuery_surveyEventsForSurvey[];
}

export interface SurveyEventsForSurveyQueryVariables {
  surveyId: string;
  scenarioId: string;
}
