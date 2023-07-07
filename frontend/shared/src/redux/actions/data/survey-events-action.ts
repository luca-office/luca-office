import {Action} from "redux"
import {SurveyEventCreationWithoutIndex} from "../../../models/survey-event-creation-without-index"

export type SurveyEventAction = AddSurveyEventAction

export enum SurveyEventsActionType {
  AddSurveyEventForIntervention = "AddSurveyEventForIntervention"
}

export interface AddSurveyEventAction extends Action {
  readonly type: SurveyEventsActionType.AddSurveyEventForIntervention
  readonly payload: SurveyEventCreationWithoutIndex
}

export const addSurveyEventAction = (surveyEvent: SurveyEventCreationWithoutIndex): AddSurveyEventAction => ({
  type: SurveyEventsActionType.AddSurveyEventForIntervention,
  payload: surveyEvent
})
