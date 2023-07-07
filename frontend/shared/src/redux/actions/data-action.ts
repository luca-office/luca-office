import {differenceInSeconds} from "date-fns"
import {Action} from "redux"
import {ThunkAction} from "redux-thunk"
import {EmailDirectory} from "../../graphql/generated/globalTypes"
import {
  Intervention,
  InterventionWithTimeOffset,
  LatestStartedProjectModule,
  LocalEmail,
  ParticipantData
} from "../../models"
import {OfficeModule} from "../../models/office-module"
import {
  checkIfInterventionConditionIsFulfilled,
  getUserEmail,
  now,
  Option,
  QuestionConfig,
  remoteToLocalEmail,
  sendEvaluateInterventionEvent,
  sendReceiveEmailEvent
} from "../../utils"
import {SharedAppState} from "../state/app-state"
import {NotesState, SurveyInvitationState} from "../state/data"
import {SharedAppAction} from "./app-action"
import {SpreadsheetAction} from "./data/spreadsheet-action"
import {SurveyEventAction} from "./data/survey-events-action"
import {TextDocumentsAction} from "./data/text-documents-action"

export type DataAction =
  | UpdateInvitationDataAction
  | UpdateOfficeModulesAction
  | UpdateParticipantDataAction
  | UpdateLatestStartedProjectModuleAction
  | SetEmailsAction
  | AddEmailAction
  | CreateEmailAction
  | DeleteEmailAction
  | UpdateEmailAction
  | MoveEmailToDirectoryAction
  | SpreadsheetAction
  | SurveyEventAction
  | ResetEmailsAction
  | UpdateNotesAction
  | TextDocumentsAction
  | ResetDataStateAction

export enum DataActionType {
  UpdateInvitationData = "UpdateInvitationData",
  UpdateOfficeModules = "UpdateOfficeModules",
  UpdateParticipantData = "UpdateParticipantData",
  UpdateLatestStartedProjectModule = "UpdateLatestStartedProjectModule",
  SetEmails = "SetEmails",
  AddEmail = "AddEmail",
  CreateEmail = "CreateEmail",
  DeleteEmail = "DeleteEmail",
  UpdateEmail = "UpdateEmail",
  MoveEmailToDirectory = "MoveEmailToDirectory",
  ResetEmails = "ResetEmails",
  UpdateNotes = "UpdateNotes",
  ResetDataState = "ResetDataState"
}

export interface UpdateInvitationDataAction extends Action {
  readonly type: DataActionType.UpdateInvitationData
  readonly payload: SurveyInvitationState
}

export interface UpdateOfficeModulesAction extends Action {
  readonly type: DataActionType.UpdateOfficeModules
  readonly payload: {
    modules: Array<OfficeModule>
  }
}
export interface UpdateLatestStartedProjectModuleAction extends Action {
  readonly type: DataActionType.UpdateLatestStartedProjectModule
  readonly payload: {
    latestStartedProjectModule: Option<LatestStartedProjectModule>
  }
}

export interface SetEmailsAction extends Action {
  readonly type: DataActionType.SetEmails
  readonly payload: {emails: LocalEmail[]}
}

export interface AddEmailAction extends Action {
  readonly type: DataActionType.AddEmail
  readonly payload: {email: LocalEmail}
}

export interface CreateEmailAction extends Action {
  readonly type: DataActionType.CreateEmail
  readonly payload: {email: LocalEmail}
}

export interface DeleteEmailAction extends Action {
  readonly type: DataActionType.DeleteEmail
  readonly payload: {id: string}
}

export interface UpdateEmailAction extends Action {
  readonly type: DataActionType.UpdateEmail
  readonly payload: {email: LocalEmail}
}

export interface MoveEmailToDirectoryAction extends Action {
  readonly type: DataActionType.MoveEmailToDirectory
  readonly payload: {id: string; dir: EmailDirectory}
}

export interface ResetEmailsAction extends Action {
  readonly type: DataActionType.ResetEmails
}

export interface UpdateNotesAction extends Action {
  readonly type: DataActionType.UpdateNotes
  readonly payload: {note: NotesState}
}

export interface ResetDataStateAction extends Action {
  readonly type: DataActionType.ResetDataState
}

export const updateInvitationDataAction = (data: SurveyInvitationState): UpdateInvitationDataAction => ({
  type: DataActionType.UpdateInvitationData,
  payload: data
})

export const updateOfficeModules = (modules: Array<OfficeModule>): UpdateOfficeModulesAction => ({
  type: DataActionType.UpdateOfficeModules,
  payload: {modules}
})

export const updateLatestStartedProjectModuleAction = (
  latestStartedProjectModule: Option<LatestStartedProjectModule>
): UpdateLatestStartedProjectModuleAction => ({
  type: DataActionType.UpdateLatestStartedProjectModule,
  payload: {latestStartedProjectModule}
})

export interface UpdateParticipantDataAction extends Action {
  readonly type: DataActionType.UpdateParticipantData
  readonly payload: {
    readonly participantData: ParticipantData
  }
}

export const updateParticipantDataAction = (participantData: ParticipantData): UpdateParticipantDataAction => ({
  type: DataActionType.UpdateParticipantData,
  payload: {participantData}
})

export const setEmailsAction = (emails: LocalEmail[]): SetEmailsAction => ({
  type: DataActionType.SetEmails,
  payload: {emails}
})

export const addEmailAction = (email: LocalEmail): AddEmailAction => ({
  type: DataActionType.AddEmail,
  payload: {email}
})

export const delayEmailAction = (email: LocalEmail): ThunkAction<void, SharedAppState, unknown, SharedAppAction> => (
  dispatch,
  getStore
) => {
  const originalScenarioId = getStore().ui.common.activeModule.map(activeModule => activeModule.scenarioId)
  const {invitationId, surveyId} = getStore().data.surveyInvitation

  window.setTimeout(() => {
    const currentScenarioId = getStore().ui.common.activeModule.map(activeModule => activeModule.scenarioId)

    if (originalScenarioId.contains(currentScenarioId.getOrElse(""))) {
      dispatch(addEmailAction({...email, isVisible: true}))

      withSurveyParams(surveyId, invitationId, currentScenarioId)(sendReceiveEmailEvent(email.id, null))
    }
  }, email.receptionDelayInSeconds * 1000)
}

export const delayInterventionEmailAction = (
  intervention: InterventionWithTimeOffset
): ThunkAction<void, SharedAppState, unknown, SharedAppAction> => (dispatch, getStore) => {
  const originalScenarioId = getStore().ui.common.activeModule.map(activeModule => activeModule.scenarioId)
  const {invitationId, surveyId} = getStore().data.surveyInvitation

  window.setTimeout(() => {
    const currentScenarioId = getStore().ui.common.activeModule.map(activeModule => activeModule.scenarioId)
    const interventionSurveyEvents = getStore().data.surveyEvents.surveyEventsForInterventions

    const isSameScenario = originalScenarioId.contains(currentScenarioId.getOrElse(""))

    const isInterventionConditionFulfilled = checkIfInterventionConditionIsFulfilled(
      intervention,
      interventionSurveyEvents
    )

    withSurveyParams(
      surveyId,
      invitationId,
      currentScenarioId
    )(sendEvaluateInterventionEvent(intervention.id, isInterventionConditionFulfilled))

    if (isSameScenario && isInterventionConditionFulfilled) {
      dispatch(
        addEmailAction({
          ...remoteToLocalEmail(intervention.interventionEmail),
          receptionDelayInSeconds: intervention.timeOffsetInSeconds
        })
      )
      withSurveyParams(
        surveyId,
        invitationId,
        currentScenarioId
      )(sendReceiveEmailEvent(intervention.interventionEmailId, intervention.id))
    }
  }, intervention.timeOffsetInSeconds * 1000)
}

export const runtimeSurveyInterventionEmailAction = (
  intervention: Intervention,
  scenarioStartedAt: Option<Date>,
  questionConfig?: QuestionConfig
): ThunkAction<void, SharedAppState, unknown, SharedAppAction> => (dispatch, getStore) => {
  const interventionSurveyEvents = getStore().data.surveyEvents.surveyEventsForInterventions
  const {invitationId, surveyId} = getStore().data.surveyInvitation
  const currentScenarioId = getStore().ui.common.activeModule.map(activeModule => activeModule.scenarioId)

  const isInterventionConditionFulfilled = checkIfInterventionConditionIsFulfilled(
    intervention,
    interventionSurveyEvents,
    questionConfig
  )

  withSurveyParams(
    surveyId,
    invitationId,
    currentScenarioId
  )(sendEvaluateInterventionEvent(intervention.id, isInterventionConditionFulfilled))

  if (isInterventionConditionFulfilled) {
    const receptionDelayInSeconds = scenarioStartedAt
      .map(startedAt => Math.abs(differenceInSeconds(now(), startedAt)))
      .getOrElse(0)

    dispatch(
      addEmailAction({
        ...remoteToLocalEmail(intervention.interventionEmail),
        receptionDelayInSeconds
      })
    )

    withSurveyParams(
      surveyId,
      invitationId,
      currentScenarioId
    )(sendReceiveEmailEvent(intervention.interventionEmailId, intervention.id))
  }
}

export const createEmailAction = (email: LocalEmail): CreateEmailAction => ({
  type: DataActionType.CreateEmail,
  payload: {email}
})

export const deleteEmailAction = (id: string): DeleteEmailAction => ({
  type: DataActionType.DeleteEmail,
  payload: {id}
})

export const updateEmailAction = (email: LocalEmail): UpdateEmailAction => ({
  type: DataActionType.UpdateEmail,
  payload: {email}
})

export const moveEmailToDirectoryAction = (id: string, dir: EmailDirectory): MoveEmailToDirectoryAction => ({
  type: DataActionType.MoveEmailToDirectory,
  payload: {id, dir}
})

export const updateNotesAction = (note: NotesState): UpdateNotesAction => ({
  type: DataActionType.UpdateNotes,
  payload: {note}
})

export const resetEmailsAction = () => ({
  type: DataActionType.ResetEmails
})

const withSurveyParams = (surveyId: Option<UUID>, invitationId: Option<UUID>, scenarioId: Option<UUID | null>) => (
  handler: (surveyId: UUID, invitationId: UUID, scenarioId: UUID) => void
) =>
  surveyId.forEach(surveyId =>
    invitationId.forEach(invitationId =>
      scenarioId.forEach(scenarioId => (scenarioId !== null ? handler(surveyId, invitationId, scenarioId) : undefined))
    )
  )
export const resetDataStateAction = (): ResetDataStateAction => ({
  type: DataActionType.ResetDataState
})
