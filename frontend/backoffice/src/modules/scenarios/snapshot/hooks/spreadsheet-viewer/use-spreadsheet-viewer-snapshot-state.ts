import {useSelector} from "react-redux"
import {SpreadsheetInfo} from "shared/models"
import {SpreadsheetViewerState} from "shared/office-tools"
import {SpreadsheetState} from "shared/redux/state/data"
import {Option} from "shared/utils"
import {AppState} from "../../../../../redux/state/app-state"

export const useSpreadsheetViewerSnapshotState = (): SpreadsheetViewerState => {
  const spreadsheets = useSelector<AppState, SpreadsheetInfo[]>(
    s => s.playerPreview.player.ui.spreadsheetViewer.openSpreadsheets
  )
  const selectedSpreadsheetId = Option.of(
    useSelector<AppState, UUID | null>(s => s.playerPreview.player.ui.spreadsheetViewer.selectedSpreadsheetId)
  )

  const localSpreadsheets = useSelector<AppState, SpreadsheetState>(
    store => store.playerPreview.player.data.spreadsheets
  )

  const viewerSpreadsheets = spreadsheets.map(spreadsheet => ({
    id: spreadsheet.id,
    cells: [],
    title: spreadsheet.title ?? "",
    createdAt: "",
    modifiedAt: "",
    filename: "",
    fileSize: -1
  }))

  const spreadsheetsForViewerTool = selectedSpreadsheetId
    .flatMap(id => Option.of(localSpreadsheets[id]))
    .map(localSheet =>
      viewerSpreadsheets.map(viewerSheet =>
        viewerSheet.id === localSheet.id
          ? {...viewerSheet, id: localSheet.id, cells: Object.values(localSheet.cells)}
          : viewerSheet
      )
    )
    .getOrElse([])

  return {
    spreadsheets: spreadsheetsForViewerTool,
    selectedSpreadsheetId,
    localSpreadsheets,
    isReadOnly: true
  }
}
