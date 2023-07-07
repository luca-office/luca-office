import {difference} from "lodash-es"
import {useSelector} from "react-redux"
import {OfficeWindowType} from "shared/enums"
import {FilesAndDirectoriesState} from "shared/office-tools/files-and-directories"
import {SpreadsheetState, TextDocumentsState} from "shared/redux/state/data"
import {Option} from "shared/utils"
import {AppState} from "../../../../../redux/state/app-state"

export const useFilesAndDirectoriesState = (): FilesAndDirectoriesState => {
  const selectedDirectoryId = useSelector<AppState, Option<UUID>>(
    state => state.playerPreview.player.ui.filesAndDirectories.selectedDirectoryId
  )

  const localSpreadsheets = useSelector<AppState, SpreadsheetState>(
    state => state.playerPreview.player.data.spreadsheets
  )

  const localTextDocuments = useSelector<AppState, TextDocumentsState>(
    state => state.playerPreview.player.data.textDocuments
  )

  const selectedFileId = useSelector<AppState, Option<UUID>>(
    state => state.playerPreview.player.ui.filesAndDirectories.selectedFileId
  )
  const expandedDirectoryIds = useSelector<AppState, UUID[]>(
    state => state.playerPreview.player.ui.filesAndDirectories.expandedDirectoryIds
  )

  const availableEmailFileIds = useSelector<AppState, UUID[]>(
    state => state.playerPreview.player.ui.filesAndDirectories.availableEmailDownloadFiles
  )
  const topmostWindow = useSelector<AppState, OfficeWindowType>(
    state =>
      difference(
        state.playerPreview.player.ui.windowManager.openWindows,
        state.playerPreview.player.ui.windowManager.minimizedWindows
      ).slice(-1)[0]
  )

  const openWindows = useSelector<AppState, Array<OfficeWindowType>>(
    state => state.playerPreview.player.ui.windowManager.openWindows
  )

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
