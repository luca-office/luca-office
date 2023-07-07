import {Action} from "redux"

export type DirectoriesAndFilesAction = ToggleExpandDirectoryAction | ExpandDirectoriesAction

export enum DirectoriesAndFilesActionType {
  ToggleExpandDirectory = "ToggleExpandDirectory",
  ExpandDirectories = "ExpandDirectories"
}

export interface ToggleExpandDirectoryAction extends Action {
  readonly type: DirectoriesAndFilesActionType.ToggleExpandDirectory
  readonly payload: {
    readonly id: UUID
  }
}

export const toggleExpandDirectoryAction = (id: UUID): ToggleExpandDirectoryAction => ({
  type: DirectoriesAndFilesActionType.ToggleExpandDirectory,
  payload: {id}
})

export interface ExpandDirectoriesAction extends Action {
  readonly type: DirectoriesAndFilesActionType.ExpandDirectories
  readonly payload: {
    readonly ids: UUID[]
  }
}

export const expandDirectoriesAction = (ids: UUID[]): ExpandDirectoriesAction => ({
  type: DirectoriesAndFilesActionType.ExpandDirectories,
  payload: {ids}
})
