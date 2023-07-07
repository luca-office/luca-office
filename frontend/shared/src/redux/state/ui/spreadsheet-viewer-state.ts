import {SpreadsheetInfo} from "../../../models"

export interface SpreadsheetViewerState {
  readonly openSpreadsheets: SpreadsheetInfo[]
  readonly selectedSpreadsheetId: UUID | null
}

export const initialSpreadsheetViewerState: SpreadsheetViewerState = {
  openSpreadsheets: [],
  selectedSpreadsheetId: null
}
