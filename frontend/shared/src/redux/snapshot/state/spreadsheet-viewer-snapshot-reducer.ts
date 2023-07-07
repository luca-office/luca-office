import {SurveyEventType} from "../../../graphql/generated/globalTypes"
import {SurveyEvent} from "../../../models"
import {SharedAppState} from "../../../redux/state"
import {SpreadsheetViewerState} from "../../../redux/state/ui"

export const spreadsheetViewerSnapshotReducer = (
  state: SharedAppState,
  surveyEvent: SurveyEvent
): SpreadsheetViewerState => {
  const spreadsheetViewer = state.ui.spreadsheetViewer

  switch (surveyEvent.eventType) {
    case SurveyEventType.OpenSpreadsheet: {
      const data = surveyEvent.data as {directoryId?: UUID; fileId: UUID; spreadsheetId: UUID; spreadsheetTitle: string}

      return {
        ...spreadsheetViewer,
        openSpreadsheets: [
          ...spreadsheetViewer.openSpreadsheets.filter(spreadsheet => spreadsheet.id !== data.spreadsheetId),
          {id: data.spreadsheetId, title: data.spreadsheetTitle}
        ],
        selectedSpreadsheetId: data.spreadsheetId
      }
    }

    case SurveyEventType.CloseSpreadsheet: {
      const data = surveyEvent.data as {spreadsheetId: UUID}

      const openSpreadsheets = spreadsheetViewer.openSpreadsheets.filter(
        spreadsheet => spreadsheet.id !== data.spreadsheetId
      )
      return {
        ...spreadsheetViewer,
        openSpreadsheets,
        selectedSpreadsheetId:
          spreadsheetViewer.selectedSpreadsheetId !== data.spreadsheetId
            ? spreadsheetViewer.selectedSpreadsheetId
            : openSpreadsheets.length
            ? openSpreadsheets[openSpreadsheets.length - 1].id
            : null
      }
    }

    default:
      return spreadsheetViewer
  }
}
