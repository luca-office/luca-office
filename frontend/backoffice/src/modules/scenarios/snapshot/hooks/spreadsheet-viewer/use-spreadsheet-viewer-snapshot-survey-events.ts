import {noop} from "lodash-es"
import {SpreadsheetViewerSurveyEvents} from "shared/office-tools"

export const useSpreadsheetViewerSnapshotSurveyEvents = (): SpreadsheetViewerSurveyEvents => {
  return {
    sendSelectCellEvent: noop,
    sendRangeSelectionEvent: noop,
    sendUpdateCellValueEvent: noop,
    sendUpdateCellTypeEvent: noop,
    sendCloseSpreadsheetEvent: noop,
    sendUpdateCellStyleEvent: noop,
    sendSelectSpreadsheetEvent: noop
  }
}
