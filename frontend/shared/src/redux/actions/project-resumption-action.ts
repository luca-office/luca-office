import {Action} from "redux"
import {Option} from "../../utils"
import {SharedAppState} from "../state"
import {ElapsedTimeOfProjectModuleForResumption} from "../state/data/project-resumption-state"

export type ProjectResumptionAction =
  | InitializeAppStateAction
  | UpdateElapsedTimeOfProjectModuleAction
  | UpdateDelayedEmailsInitializedAction
  | UpdateInterventionEmailsInitializedAction
  | ResetProjectResumptionStateAction

export enum ProjectResumptionActionType {
  InitializeAppState = "ProjectResumption.InitializeAppStateAction",
  UpdateElapsedTimeOfProjectModule = "ProjectResumption.UpdateElapsedTimeOfProjectModule",
  UpdateDelayedEmailsInitialized = "ProjectResumption.UpdateDelayedEmailsInitialized",
  UpdateInterventionEmailsInitialized = "ProjectResumption.UpdateInterventionEmailsInitialized",
  ResetProjectResumptionState = "ResetProjectResumptionState"
}

export interface InitializeAppStateAction extends Action {
  readonly type: ProjectResumptionActionType.InitializeAppState
  readonly state: SharedAppState
}

export const initializeAppStateAction = (state: SharedAppState): InitializeAppStateAction => ({
  type: ProjectResumptionActionType.InitializeAppState,
  state
})

export interface UpdateElapsedTimeOfProjectModuleAction extends Action {
  readonly type: ProjectResumptionActionType.UpdateElapsedTimeOfProjectModule
  readonly elapsedTimeOfProjectModule: Option<ElapsedTimeOfProjectModuleForResumption>
}

export const updateElapsedTimeOfProjectModuleAction = (
  elapsedTimeOfProjectModule: Option<ElapsedTimeOfProjectModuleForResumption>
): UpdateElapsedTimeOfProjectModuleAction => ({
  type: ProjectResumptionActionType.UpdateElapsedTimeOfProjectModule,
  elapsedTimeOfProjectModule
})

export interface UpdateDelayedEmailsInitializedAction extends Action {
  readonly type: ProjectResumptionActionType.UpdateDelayedEmailsInitialized
  readonly emailsAreInitialized: boolean
}

export const updateDelayedEmailsInitializedAction = (
  emailsAreInitialized: boolean
): UpdateDelayedEmailsInitializedAction => ({
  type: ProjectResumptionActionType.UpdateDelayedEmailsInitialized,
  emailsAreInitialized
})

export interface UpdateInterventionEmailsInitializedAction extends Action {
  readonly type: ProjectResumptionActionType.UpdateInterventionEmailsInitialized
  readonly interventionEmailsAreInitialized: boolean
}

export const updateInterventionEmailsInitializedAction = (
  interventionEmailsAreInitialized: boolean
): UpdateInterventionEmailsInitializedAction => ({
  type: ProjectResumptionActionType.UpdateInterventionEmailsInitialized,
  interventionEmailsAreInitialized
})

export interface ResetProjectResumptionStateAction extends Action {
  readonly type: ProjectResumptionActionType.ResetProjectResumptionState
}

export const resetProjectResumptionStateAction = (): ResetProjectResumptionStateAction => ({
  type: ProjectResumptionActionType.ResetProjectResumptionState
})
