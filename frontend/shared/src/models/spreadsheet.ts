import {SpreadsheetCell} from "./spreadsheet-cell"

export interface Spreadsheet {
  readonly id: UUID
  readonly createdAt: string
  readonly modifiedAt: string
  readonly filename: string
  readonly fileSize: number
  readonly cells: SpreadsheetCell[]
}

export interface ViewerSpreadsheet extends Spreadsheet {
  readonly title: string
}

export interface LocalSpreadsheet {
  readonly id: UUID
  readonly cells: {[cellId: string]: SpreadsheetCell}
}
