import {SpreadsheetCellType} from "../graphql/generated/globalTypes"

export interface SerializedCell {
  readonly rowIndex: number
  readonly columnIndex: number
  readonly cellType: SpreadsheetCellType
  readonly value: string
  readonly style: {[key: string]: string} | null
}
