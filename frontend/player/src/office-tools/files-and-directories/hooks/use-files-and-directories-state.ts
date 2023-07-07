import {useSelector} from "react-redux"
import {OfficeWindowType} from "shared/enums"
import {FilesAndDirectoriesState} from "shared/office-tools/files-and-directories"
import {SpreadsheetState, TextDocumentsState} from "shared/redux/state/data"
import {Option} from "shared/utils"
import {useTopmostWindow} from "../../../hooks/use-topmost-window"
import {AppState} from "../../../redux/state/app-state"

export const useFilesAndDirectoriesState = (): FilesAndDirectoriesState => {
  const selectedDirectoryId = useSelector<AppState, Option<UUID>>(
    state => state.ui.filesAndDirectories.selectedDirectoryId
  )
  const localSpreadsheets = useSelector<AppState, SpreadsheetState>(state => state.data.spreadsheets)
  const localTextDocuments = useSelector<AppState, TextDocumentsState>(state => state.data.textDocuments)
  const selectedFileId = useSelector<AppState, Option<UUID>>(state => state.ui.filesAndDirectories.selectedFileId)
  const expandedDirectoryIds = useSelector<AppState, UUID[]>(state => state.ui.filesAndDirectories.expandedDirectoryIds)
  const availableEmailFileIds = useSelector<AppState, UUID[]>(
    state => state.ui.filesAndDirectories.availableEmailDownloadFiles
  )
  const openWindows = useSelector<AppState, Array<OfficeWindowType>>(state => state.ui.windowManager.openWindows)
  const topmostWindow = useTopmostWindow()

  return {
    selectedDirectoryId,
    localSpreadsheets,
    localTextDocuments,
    selectedFileId,
    expandedDirectoryIds,
    availableEmailFileIds,
    topmostWindow,
    openWindows
  }
}
