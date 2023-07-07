import {Action} from "redux"
import {ProjectModule} from "shared/models"
import {now, Option} from "shared/utils"

export type SynchronSurveyAction = SetActiveModuleAction | SetActiveModuleIndexAction

export enum SynchronSurveyActionType {
  SetActiveModule = "SynchronSurvey.SetActiveModule",
  SetActiveModuleIndex = "SynchronSurvey.SetActiveModuleIndex"
}

export interface SetActiveModuleAction extends Action {
  readonly type: SynchronSurveyActionType.SetActiveModule
  readonly projectModule: Option<ProjectModule>
  readonly startedAt: Date
}

export const setActiveModuleAction = (module: Option<ProjectModule>, startedAt?: Date): SetActiveModuleAction => ({
  type: SynchronSurveyActionType.SetActiveModule,
  projectModule: module,
  startedAt: startedAt ?? now()
})

export interface SetActiveModuleIndexAction extends Action {
  readonly type: SynchronSurveyActionType.SetActiveModuleIndex
  readonly moduleIndex: Option<number>
}

export const setActiveModuleIndexAction = (index: Option<number>): SetActiveModuleIndexAction => ({
  type: SynchronSurveyActionType.SetActiveModuleIndex,
  moduleIndex: index
})
