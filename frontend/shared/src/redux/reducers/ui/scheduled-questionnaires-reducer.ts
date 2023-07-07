import {Reducer} from "redux"
import {SharedAppAction} from "../../actions/app-action"
import {ScheduledQuestionnaireActionType} from "../../actions/ui/scheduled-questionnaires-action"
import {initialScheduledQuestionnaireState, ScheduledQuestionnairesState} from "../../state/ui"

export const scheduledQuestionnairesReducer: Reducer<ScheduledQuestionnairesState, SharedAppAction> = (
  state = initialScheduledQuestionnaireState,
  action
) => {
  switch (action.type) {
    case ScheduledQuestionnaireActionType.AddScheduledQuestionnaire:
      return {...state, scheduledQuestionnaires: [...state.scheduledQuestionnaires, action.payload]}
    case ScheduledQuestionnaireActionType.DeleteScheduledQuestionnaire:
      return {
        ...state,
        scheduledQuestionnaires: state.scheduledQuestionnaires.filter(
          scheduledQuestionnaire => scheduledQuestionnaire.questionnaireId !== action.payload.questionnaireId
        ),
        activeQuestionnaireIds: state.activeQuestionnaireIds.filter(id => id !== action.payload.questionnaireId)
      }
    case ScheduledQuestionnaireActionType.ClearScheduledQuestionnaires:
      return initialScheduledQuestionnaireState
    case ScheduledQuestionnaireActionType.AddActiveQuestionnaire:
      return {
        ...state,
        activeQuestionnaireIds: [
          ...state.activeQuestionnaireIds.filter(id => id !== action.payload.questionnaireId),
          action.payload.questionnaireId
        ]
      }
    default:
      return state
  }
}
