import {SurveyEventCreationWithoutIndex} from "../../../models/survey-event-creation-without-index"

export interface SurveyEventsState {
  readonly surveyEventsForInterventions: SurveyEventCreationWithoutIndex[]
}

export const initialSurveyEventsState: SurveyEventsState = {
  surveyEventsForInterventions: []
}
