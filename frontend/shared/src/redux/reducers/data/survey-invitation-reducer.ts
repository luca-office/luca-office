import {Reducer} from "redux"
import {SharedAppAction} from "../../actions/app-action"
import {DataActionType} from "../../actions/data-action"
import {initialSurveyInvitationState, SurveyInvitationState} from "../../state/data"

export const surveyInvitationReducer: Reducer<SurveyInvitationState, SharedAppAction> = (
  state = initialSurveyInvitationState,
  action
): SurveyInvitationState => {
  switch (action.type) {
    case DataActionType.UpdateInvitationData:
      return {
        token: action.payload.token,
        invitationId: action.payload.invitationId,
        surveyId: action.payload.surveyId,
        executionType: action.payload.executionType,
        manualSurveyStartedAt: action.payload.manualSurveyStartedAt
      }

    default:
      return state
  }
}
