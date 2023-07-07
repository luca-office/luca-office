import {SurveyEventType} from "../../../graphql/generated/globalTypes"
import {
  SurveyEvent,
  UpdateCellStyleSurveyEventPayload,
  UpdateCellTypeSurveyEventPayload,
  UpdateCellValueSurveyEventPayload
} from "../../../models"
import {SharedAppState} from "../../../redux/state"
import {SpreadsheetState} from "../../../redux/state/data"

export const spreadsheetsSnapshotReducer = (state: SharedAppState, surveyEvent: SurveyEvent): SpreadsheetState => {
  const spreadsheets = state.data.spreadsheets

  switch (surveyEvent.eventType) {
    case SurveyEventType.UpdateSpreadsheetCellValue: {
      const data = surveyEvent.data as UpdateCellValueSurveyEventPayload

      return {
        ...spreadsheets,
        [data.spreadsheetId]: {
          ...spreadsheets[data.spreadsheetId],
          cells: {
            ...spreadsheets[data.spreadsheetId]?.cells,
            [data.cellId]: {
              ...spreadsheets[data.spreadsheetId]?.cells[data.cellId],
              value: data.value,
              cellType: data.cellType,
              columnIndex: data.columnIndex,
              id: data.cellId,
              rowIndex: data.rowIndex,
              __typename: "SpreadsheetCell",
              spreadsheetId: data.spreadsheetId
            }
          }
        }
      }
    }

    case SurveyEventType.UpdateSpreadsheetCellType: {
      const data = surveyEvent.data as UpdateCellTypeSurveyEventPayload

      return {
        ...spreadsheets,
        [data.spreadsheetId]: {
          ...spreadsheets[data.spreadsheetId],
          cells: {
            ...spreadsheets[data.spreadsheetId]?.cells,
            [data.cellId]: {
              ...spreadsheets[data.spreadsheetId]?.cells[data.cellId],
              cellType: data.cellType
            }
          }
        }
      }
    }

    case SurveyEventType.UpdateSpreadsheetCellStyle: {
      const data = surveyEvent.data as UpdateCellStyleSurveyEventPayload

      return {
        ...spreadsheets,
        [data.spreadsheetId]: {
          ...spreadsheets[data.spreadsheetId],
          cells: {
            ...spreadsheets[data.spreadsheetId]?.cells,
            [data.cellId]: {
              ...spreadsheets[data.spreadsheetId]?.cells[data.cellId],
              style: data.style ? JSON.stringify(data.style) : null
            }
          }
        }
      }
    }
    default:
      return spreadsheets
  }
}
