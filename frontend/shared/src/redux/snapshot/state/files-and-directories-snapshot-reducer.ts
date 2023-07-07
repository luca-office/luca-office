import {union} from "lodash-es"
import {SurveyEventType} from "../../../graphql/generated/globalTypes"
import {SurveyEvent, ViewFileSurveyEventPayload} from "../../../models"
import {SharedAppState} from "../../../redux/state"
import {FilesAndDirectoriesState} from "../../../redux/state/ui"
import {Option} from "../../../utils"

export const filesAndDirectoriesSnapshotReducer = (
  state: SharedAppState,
  surveyEvent: SurveyEvent
): FilesAndDirectoriesState => {
  const filesAndDirectories = state.ui.filesAndDirectories

  switch (surveyEvent.eventType) {
    case SurveyEventType.ViewDirectory: {
      const data = surveyEvent.data as {directoryId: UUID}
      return {
        ...filesAndDirectories,
        selectedDirectoryId: Option.of(data.directoryId),
        selectedFileId: Option.none()
      }
    }
    case SurveyEventType.ViewFile: {
      const data = surveyEvent.data as ViewFileSurveyEventPayload
      return {
        ...filesAndDirectories,
        selectedFileId: Option.of(data.fileId),
        selectedDirectoryId: Option.none()
      }
    }
    case SurveyEventType.DownloadEmailAttachment: {
      const data = surveyEvent.data as {scenarioId: UUID; emailId: UUID; fileId: UUID}
      return {
        ...filesAndDirectories,
        availableEmailDownloadFiles: [...filesAndDirectories.availableEmailDownloadFiles, data.fileId]
      }
    }
    case SurveyEventType.AddEmailAttachment: {
      const data = surveyEvent.data as {emailId: UUID; fileId: UUID}
      return {
        ...filesAndDirectories,
        availableEmailUploadFiles: {
          ...filesAndDirectories.availableEmailUploadFiles,
          [data.emailId]: union([...(filesAndDirectories.availableEmailUploadFiles[data.emailId] || []), data.fileId])
        }
      }
    }
    case SurveyEventType.DeleteEmailAttachment: {
      const data = surveyEvent.data as {emailId: UUID; fileId: UUID}
      return {
        ...filesAndDirectories,
        availableEmailUploadFiles: {
          ...filesAndDirectories.availableEmailUploadFiles,
          [data.emailId]: [
            ...(filesAndDirectories.availableEmailUploadFiles[data.emailId] || []).filter(id => id !== data.fileId)
          ]
        }
      }
    }
    default:
      return filesAndDirectories
  }
}
