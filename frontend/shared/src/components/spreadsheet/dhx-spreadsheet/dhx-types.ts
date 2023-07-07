import {CellFormats} from "../../../assets/dhx-spreadsheet/types/ts-spreadsheet/sources/types"

export interface DhxSheet {
  readonly data: DhxCell[]
}

export interface DhxCell {
  readonly cell: string
  readonly format: CellFormats
  readonly value: any
}

export type DhxCellStyle = {[key: string]: string} | null
