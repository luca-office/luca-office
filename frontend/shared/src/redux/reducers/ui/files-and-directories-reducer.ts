import {omit, union, unionBy} from "lodash-es"
import {Reducer} from "redux"
import {Option} from "../../../utils"
import {SharedAppAction} from "../../actions"
import {FilesAndDirectoriesActionType} from "../../actions/ui/files-and-directories-action"
import {FilesAndDirectoriesState, initialFilesAndDirectoriesState} from "../../state/ui"

export const filesAndDirectoriesReducer: Reducer<FilesAndDirectoriesState, SharedAppAction> = (
  state = initialFilesAndDirectoriesState,
  action
): FilesAndDirectoriesState => {
  switch (action.type) {
    case FilesAndDirectoriesActionType.SelectDirectory:
      return {
        ...state,
        selectedDirectoryId: Option.of(action.payload.id),
        selectedFileId: Option.none()
      }
    case FilesAndDirectoriesActionType.SelectFile:
      return {
        ...state,
        selectedDirectoryId: Option.none(),
        selectedFileId: Option.of(action.payload.id)
      }
    case FilesAndDirectoriesActionType.ToggleExpandDirectory:
      return {
        ...state,
        expandedDirectoryIds: state.expandedDirectoryIds.includes(action.payload.id)
          ? state.expandedDirectoryIds.filter(id => id !== action.payload.id)
          : state.expandedDirectoryIds.concat(action.payload.id)
      }
    case FilesAndDirectoriesActionType.ExpandDirectories:
      return {
        ...state,
        expandedDirectoryIds: state.expandedDirectoryIds.concat(action.payload.ids)
      }
    case FilesAndDirectoriesActionType.AddEmailFileToDownloads: {
      const isNew = !state.availableEmailDownloadFiles.includes(action.payload.fileId)

      return {
        ...state,
        ...(isNew && {
          availableEmailDownloadFiles: [...state.availableEmailDownloadFiles, action.payload.fileId],
          newEmailFilesCounter: state.newEmailFilesCounter + 1
        })
      }
    }
    case FilesAndDirectoriesActionType.AddEmailFileToUploads: {
      const emailId = action.payload.emailId
      return {
        ...state,
        availableEmailUploadFiles: {
          ...state.availableEmailUploadFiles,
          [emailId]: union([...(state.availableEmailUploadFiles[emailId] || []), action.payload.fileId])
        }
      }
    }
    case FilesAndDirectoriesActionType.RemoveEmailFileFromUploads: {
      const emailId = action.payload.emailId
      return {
        ...state,
        availableEmailUploadFiles: {
          ...state.availableEmailUploadFiles,
          [emailId]: [...(state.availableEmailUploadFiles[emailId] || []).filter(id => id !== action.payload.fileId)]
        }
      }
    }
    case FilesAndDirectoriesActionType.RemoveEmailFilesFromUploads: {
      return {
        ...state,
        availableEmailUploadFiles: omit(state.availableEmailUploadFiles, action.payload.emailId)
      }
    }
    case FilesAndDirectoriesActionType.ResetEmailFileDownloadCounter:
      return {
        ...state,
        newEmailFilesCounter: 0
      }
    default:
      return state
  }
}
