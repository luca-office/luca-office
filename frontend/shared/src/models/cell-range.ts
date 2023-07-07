import {CellIndex} from "./cell-index"

export interface CellRange {
  readonly start: CellIndex
  readonly end: CellIndex
}
