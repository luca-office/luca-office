import {Reducer} from "redux"
import {SharedAppAction} from "../../actions"
import {SurveyEventsActionType} from "../../actions/data/survey-events-action"
import {initialSurveyEventsState, SurveyEventsState} from "../../state/data"

export const surveyEventsReducer: Reducer<SurveyEventsState, SharedAppAction> = (
  state = initialSurveyEventsState,
  action
) => {
  switch (action.type) {
    case SurveyEventsActionType.AddSurveyEventForIntervention:
      return {
        ...state,
        surveyEventsForInterventions: [...state.surveyEventsForInterventions, action.payload]
      }
    default:
      return state
  }
}
