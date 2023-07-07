import {Action} from "redux"
import {File} from "../../../models"

export type FilesAndDirectoriesAction =
  | SelectDirectoryAction
  | SelectFileAction
  | ToggleExpandDirectoryAction
  | ExpandDirectoriesAction
  | AddEmailFileToDownloadsAction
  | AddEmailFileToUploadsAction
  | RemoveEmailFileFromUploadsAction
  | RemoveEmailFilesFromUploadsAction
  | ResetEmailFileDownloadCounterAction

export enum FilesAndDirectoriesActionType {
  SelectDirectory = "SelectDirectory",
  SelectFile = "SelectFile",
  ToggleExpandDirectory = "ToggleExpandDirectory",
  ExpandDirectories = "ExpandDirectories",
  AddEmailFileToDownloads = "AddEmailFileToDownloads",
  AddEmailFileToUploads = "AddEmailFileToUploads",
  RemoveEmailFileFromUploads = "RemoveEmailFileFromUploads",
  RemoveEmailFilesFromUploads = "RemoveEmailFilesFromUploads",
  ResetEmailFileDownloadCounter = "ResetEmailFileDownloadCounter"
}

export interface SelectDirectoryAction extends Action {
  readonly type: FilesAndDirectoriesActionType.SelectDirectory
  readonly payload: {
    readonly id: UUID
  }
}

export const selectDirectoryAction = (id: UUID): SelectDirectoryAction => ({
  type: FilesAndDirectoriesActionType.SelectDirectory,
  payload: {id}
})

export interface SelectFileAction extends Action {
  readonly type: FilesAndDirectoriesActionType.SelectFile
  readonly payload: {
    readonly id: UUID
  }
}

export const selectFileAction = (id: UUID): SelectFileAction => ({
  type: FilesAndDirectoriesActionType.SelectFile,
  payload: {id}
})

export interface ToggleExpandDirectoryAction extends Action {
  readonly type: FilesAndDirectoriesActionType.ToggleExpandDirectory
  readonly payload: {
    readonly id: UUID
  }
}

export const toggleExpandDirectoryAction = (id: UUID): ToggleExpandDirectoryAction => ({
  type: FilesAndDirectoriesActionType.ToggleExpandDirectory,
  payload: {id}
})

export interface ExpandDirectoriesAction extends Action {
  readonly type: FilesAndDirectoriesActionType.ExpandDirectories
  readonly payload: {
    readonly ids: UUID[]
  }
}

export const expandDirectoriesAction = (ids: UUID[]): ExpandDirectoriesAction => ({
  type: FilesAndDirectoriesActionType.ExpandDirectories,
  payload: {ids}
})

export interface AddEmailFileToDownloadsAction extends Action {
  readonly type: FilesAndDirectoriesActionType.AddEmailFileToDownloads
  readonly payload: {
    readonly fileId: UUID
  }
}

export const addEmailFileToDownloadsAction = (id: UUID): AddEmailFileToDownloadsAction => ({
  type: FilesAndDirectoriesActionType.AddEmailFileToDownloads,
  payload: {fileId: id}
})

export interface AddEmailFileToUploadsAction extends Action {
  readonly type: FilesAndDirectoriesActionType.AddEmailFileToUploads
  readonly payload: {
    readonly emailId: UUID
    readonly fileId: UUID
  }
}

export const addEmailFileToUploadsAction = (emailId: UUID, fileId: UUID): AddEmailFileToUploadsAction => ({
  type: FilesAndDirectoriesActionType.AddEmailFileToUploads,
  payload: {emailId, fileId}
})

export interface RemoveEmailFileFromUploadsAction extends Action {
  readonly type: FilesAndDirectoriesActionType.RemoveEmailFileFromUploads
  readonly payload: {
    readonly emailId: UUID
    readonly fileId: UUID
  }
}

export const removeEmailFileFromUploadsAction = (emailId: UUID, fileId: UUID): RemoveEmailFileFromUploadsAction => ({
  type: FilesAndDirectoriesActionType.RemoveEmailFileFromUploads,
  payload: {emailId, fileId}
})

export interface RemoveEmailFilesFromUploadsAction extends Action {
  readonly type: FilesAndDirectoriesActionType.RemoveEmailFilesFromUploads
  readonly payload: {
    readonly emailId: UUID
  }
}

export const removeEmailFilesFromUploadsAction = (emailId: UUID): RemoveEmailFilesFromUploadsAction => ({
  type: FilesAndDirectoriesActionType.RemoveEmailFilesFromUploads,
  payload: {emailId}
})

export interface ResetEmailFileDownloadCounterAction extends Action {
  readonly type: FilesAndDirectoriesActionType.ResetEmailFileDownloadCounter
}

export const resetEmailFileDownloadCounterAction = (): ResetEmailFileDownloadCounterAction => ({
  type: FilesAndDirectoriesActionType.ResetEmailFileDownloadCounter
})
