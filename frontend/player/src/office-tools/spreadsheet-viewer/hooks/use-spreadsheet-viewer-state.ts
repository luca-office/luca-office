import {useSelector} from "react-redux"
import {SpreadsheetInfo} from "shared/models"
import {SpreadsheetViewerState} from "shared/office-tools"
import {SharedAppState} from "shared/redux/state/app-state"
import {SpreadsheetState} from "shared/redux/state/data"
import {Option} from "shared/utils"

export const useSpreadsheetViewerState = (isQuestionnaireEventVisible = false): SpreadsheetViewerState => {
  const openSpreadsheets = useSelector<SharedAppState, SpreadsheetInfo[]>(s => s.ui.spreadsheetViewer.openSpreadsheets)
  const localSpreadsheets = useSelector<SharedAppState, SpreadsheetState>(s => s.data.spreadsheets)
  const selectedSpreadsheetId = useSelector<SharedAppState, UUID | null>(
    s => s.ui.spreadsheetViewer.selectedSpreadsheetId
  )
  const selectedSpreadsheetIdOption = Option.of(selectedSpreadsheetId)

  const viewerSpreadsheets = openSpreadsheets.map(spreadsheet => ({
    id: spreadsheet.id,
    cells: [],
    title: spreadsheet.title ?? "",
    createdAt: "",
    modifiedAt: "",
    filename: "",
    fileSize: -1
  }))

  const spreadsheetsForViewerTool = selectedSpreadsheetIdOption
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
    selectedSpreadsheetId: selectedSpreadsheetIdOption,
    localSpreadsheets,
    isReadOnly: isQuestionnaireEventVisible
  }
}
