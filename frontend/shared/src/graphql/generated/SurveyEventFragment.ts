/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SurveyEventType } from "./globalTypes";

// ====================================================
// GraphQL fragment: SurveyEventFragment
// ====================================================

export interface SurveyEventFragment {
  __typename: "SurveyEvent";
  timestamp: string;
  eventType: SurveyEventType;
  data: string | null;
  surveyId: string;
  index: number;
  invitationId: string | null;
}
