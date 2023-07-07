import {Action} from "redux"
import {Option} from "shared/utils"

export type ProjectsAction = ResetSelectedListTabIndexAction | SelectListTabIndexAction

export enum ProjectsActionType {
  SelectListTabIndex = "Projects.SelectListTabIndex",
  ResetSelectedListTabIndex = "Projects.ResetSelectedListTabIndex"
}

export interface ResetSelectedListTabIndexAction extends Action {
  readonly type: ProjectsActionType.ResetSelectedListTabIndex
}

export const resetSelectedListTabIndexAction = (): ResetSelectedListTabIndexAction => ({
  type: ProjectsActionType.ResetSelectedListTabIndex
})

export interface SelectListTabIndexAction extends Action {
  readonly type: ProjectsActionType.SelectListTabIndex
  readonly payload: Option<Map<UUID, number>>
}

export const selectListTabIndexAction = (activeProject: UUID, selectedIndex: number): SelectListTabIndexAction => {
  const result = new Map()
  result.set(activeProject, selectedIndex)

  return {
    type: ProjectsActionType.SelectListTabIndex,
    payload: Option.of(result)
  }
}
