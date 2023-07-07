import {keyBy} from "lodash-es"
import {FileType} from "../enums"
import {File, LocalSpreadsheet, Spreadsheet, SpreadsheetFile} from "../models"
import {SpreadsheetState} from "../redux/state/data"
import {find, Option} from "../utils"

export const localSpreadsheetsToSpreadsheet = (localSpreadsheets: SpreadsheetState): Spreadsheet[] =>
  Object.values(localSpreadsheets).map(localSpreadsheet => ({
    id: localSpreadsheet.id,
    cells: Object.values(localSpreadsheet.cells),
    createdAt: "",
    modifiedAt: "",
    filename: "",
    fileSize: -1
  }))

export const mergeRemoteFilesWithLocalSpreadsheets = (localSpreadsheets: SpreadsheetState, files: File[]): File[] => {
  const spreadsheets = localSpreadsheetsToSpreadsheet(localSpreadsheets)
  const spreadsheetIds = spreadsheets.map(spreadsheet => spreadsheet.id)
  return files.map(file =>
    file.fileType === FileType.Spreadsheet && spreadsheetIds.includes(file.spreadsheetId)
      ? {...file, spreadsheet: spreadsheets.find(sheet => sheet.id === file.spreadsheetId) as Spreadsheet}
      : file
  )
}

export const toLocalSpreadsheet = (spreadsheet: Spreadsheet): LocalSpreadsheet => ({
  ...spreadsheet,
  cells: keyBy(spreadsheet.cells, "id")
})

export const getFileBySpreadsheetId = (files: File[], spreadsheetId: UUID): Option<File> =>
  find(file => file.fileType === FileType.Spreadsheet && file.spreadsheet.id === spreadsheetId, files)

export const isSpreadsheetFile = (file: File): file is SpreadsheetFile => "spreadsheet" in file
