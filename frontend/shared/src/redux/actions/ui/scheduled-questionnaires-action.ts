import {Action} from "redux"
import {ThunkAction} from "redux-thunk"
import {SharedAppState} from "../../state/app-state"
import {ScheduledQuestionnaire} from "../../state/ui"
import {SharedAppAction} from "../app-action"

export enum ScheduledQuestionnaireActionType {
  ScheduleQuestionnaire = "ScheduleQuestionnaire",
  AddScheduledQuestionnaire = "AddScheduledQuestionnaire",
  DeleteScheduledQuestionnaire = "DeleteScheduledQuestionnaire",
  ClearScheduledQuestionnaires = "ClearScheduledQuestionnaires",
  AddActiveQuestionnaire = "AddActiveQuestionnaire"
}

export interface ScheduleQuestionnaireAction extends Action {
  readonly type: ScheduledQuestionnaireActionType.ScheduleQuestionnaire
  readonly payload: {questionnaireId: UUID}
}

export interface AddScheduledQuestionnaireAction extends Action {
  readonly type: ScheduledQuestionnaireActionType.AddScheduledQuestionnaire
  readonly payload: ScheduledQuestionnaire
}

export interface DeleteScheduledQuestionnaireAction extends Action {
  readonly type: ScheduledQuestionnaireActionType.DeleteScheduledQuestionnaire
  readonly payload: {questionnaireId: UUID}
}

export interface ClearScheduledQuestionnairesAction extends Action {
  readonly type: ScheduledQuestionnaireActionType.ClearScheduledQuestionnaires
}

export interface AddActiveQuestionnaireAction extends Action {
  readonly type: ScheduledQuestionnaireActionType.AddActiveQuestionnaire
  readonly payload: {questionnaireId: UUID}
}
export const addActiveQuestionnaire = (questionnaireId: UUID): AddActiveQuestionnaireAction => ({
  type: ScheduledQuestionnaireActionType.AddActiveQuestionnaire,
  payload: {questionnaireId}
})

export const scheduleQuestionnaire = (
  questionnaireId: UUID,
  delayInSeconds: number
): ThunkAction<void, SharedAppState, unknown, SharedAppAction> => dispatch => {
  const timerHandle = window.setTimeout(() => {
    dispatch(deleteScheduledQuestionnaire(questionnaireId))
    dispatch(addActiveQuestionnaire(questionnaireId))
  }, delayInSeconds * 1000)

  dispatch(addScheduledQuestionnaire({questionnaireId, timerHandle}))
}

export const addScheduledQuestionnaire = (
  scheduledQuestionnaire: ScheduledQuestionnaire
): AddScheduledQuestionnaireAction => ({
  type: ScheduledQuestionnaireActionType.AddScheduledQuestionnaire,
  payload: scheduledQuestionnaire
})

export const cancelScheduledQuestionnaires = (): ThunkAction<void, SharedAppState, unknown, SharedAppAction> => (
  dispatch,
  getStore
) => {
  const scheduledQuestionnairesState = getStore().ui.scheduledQuestionnaires

  scheduledQuestionnairesState.scheduledQuestionnaires.forEach(questionnaire => {
    window.clearTimeout(questionnaire.timerHandle)
  })

  dispatch(clearScheduledQuestionnaires())
}

export const deleteScheduledQuestionnaire = (questionnaireId: UUID): DeleteScheduledQuestionnaireAction => ({
  type: ScheduledQuestionnaireActionType.DeleteScheduledQuestionnaire,
  payload: {questionnaireId}
})

export const clearScheduledQuestionnaires = (): ClearScheduledQuestionnairesAction => ({
  type: ScheduledQuestionnaireActionType.ClearScheduledQuestionnaires
})

export type ScheduledQuestionnaireAction =
  | AddScheduledQuestionnaireAction
  | DeleteScheduledQuestionnaireAction
  | ClearScheduledQuestionnairesAction
  | AddActiveQuestionnaireAction
