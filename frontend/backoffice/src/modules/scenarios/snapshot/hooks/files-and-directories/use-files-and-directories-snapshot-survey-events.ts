import {noop} from "lodash-es"
import {FilesAndDirectoriesSurveyEvents} from "shared/office-tools/files-and-directories"

export const useFilesAndDirectoriesSnapshotSurveyEvents = (): FilesAndDirectoriesSurveyEvents => {
  return {
    sendOpenToolEvent: noop,
    sendRestoreToolEvent: noop,
    sendViewDirectoryEvent: noop,
    sendViewFileEvent: noop,
    sendViewDownloadsDirectoryEvent: noop,
    sendOpenImageBinaryEvent: noop,
    sendOpenPdfBinaryEvent: noop,
    sendOpenSpreadsheetEvent: noop,
    sendOpenVideoBinaryEvent: noop,
    sendOpenTextDocumentEvent: noop
  }
}
