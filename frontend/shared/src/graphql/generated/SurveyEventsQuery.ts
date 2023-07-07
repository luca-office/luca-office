/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SurveyEventType } from "./globalTypes";

// ====================================================
// GraphQL query operation: SurveyEventsQuery
// ====================================================

export interface SurveyEventsQuery_surveyEvents {
  __typename: "SurveyEvent";
  timestamp: string;
  eventType: SurveyEventType;
  data: string | null;
  surveyId: string;
  index: number;
  invitationId: string | null;
}

export interface SurveyEventsQuery {
  surveyEvents: SurveyEventsQuery_surveyEvents[];
}

export interface SurveyEventsQueryVariables {
  surveyInvitationId: string;
  scenarioId: string;
}
