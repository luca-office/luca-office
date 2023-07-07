import {Action} from "redux"
import {CommonUiAction} from "./ui/common-ui-action"
import {ProjectsAction} from "./ui/projects-action"
import {ScenariosAction} from "./ui/scenarios-action"
import {SynchronSurveyAction} from "./ui/synchron-survey-action"

export type UiAction = CommonUiAction | ScenariosAction | ResetApplicationAction | ProjectsAction | SynchronSurveyAction

export enum UiActionType {
  ResetApplication = "ResetApplication"
}

export interface ResetApplicationAction extends Action {
  readonly type: UiActionType.ResetApplication
}

export const resetApplicationAction = (): ResetApplicationAction => ({
  type: UiActionType.ResetApplication
})
