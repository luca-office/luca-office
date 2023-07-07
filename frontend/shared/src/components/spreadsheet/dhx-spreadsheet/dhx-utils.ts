import {isEmpty} from "lodash-es"
import {Spreadsheet as SpreadsheetInstance} from "../../../assets/dhx-spreadsheet/types/ts-spreadsheet/sources/Spreadsheet"
import {CellFormats, IDataWithStyles} from "../../../assets/dhx-spreadsheet/types/ts-spreadsheet/sources/types"
import {SpreadsheetCellType} from "../../../graphql/generated/globalTypes"
import {CellIndex, CellRange, SerializedCell, SpreadsheetCell} from "../../../models"
import {isDefined, Option, parseJson} from "../../../utils"
import {DhxCellStyle, DhxSheet} from "./dhx-types"

export const defaultSpreadsheetColumnsCount = 24
export const defaultSpreadsheetRowsCount = 100

export const indexToColumnName = (index: number): string => {
  const letterIndex = index % 26
  const letter = String.fromCharCode(65 + letterIndex)
  const group = Math.floor(index / 26)
  return group > 0 ? indexToColumnName(group - 1) + letter : letter
}

export const indexToCellName = ({rowIndex, columnIndex}: CellIndex) => indexToColumnName(columnIndex) + (rowIndex + 1)

export const toDhxData = (cells: SpreadsheetCell[]): IDataWithStyles => {
  const className = (cell: SpreadsheetCell) => `dhx-cell-${cell.rowIndex}-${cell.columnIndex}`

  const dhxCells = cells.map(cell => ({
    cell: indexToCellName({rowIndex: cell.rowIndex, columnIndex: cell.columnIndex}),
    value: cell.value,
    format: toDhxCellFormat(cell.cellType),
    css: cell.style !== null ? className(cell) : undefined
  }))

  const dhxStyles = cells.reduce((styles, cell) => {
    const styleOption = Option.of(cell.style).flatMap(parseJson)
    return styleOption.map(style => ({...styles, [className(cell)]: style})).getOrElse(styles)
  }, {})

  return {data: dhxCells, styles: dhxStyles}
}

export const toDhxCellFormat = (cellType: SpreadsheetCellType): CellFormats => {
  switch (cellType) {
    case SpreadsheetCellType.Currency:
      return "currency"
    case SpreadsheetCellType.Number:
      return "number"
    case SpreadsheetCellType.Text:
      return "text"
    case SpreadsheetCellType.Percent:
      return "percent"
    case SpreadsheetCellType.Date:
      return "date"
    default:
      return "common"
  }
}

export const toSpreadsheetCellType = (format: CellFormats): SpreadsheetCellType => {
  switch (format) {
    case "currency":
      return SpreadsheetCellType.Currency
    case "number":
      return SpreadsheetCellType.Number
    case "text":
      return SpreadsheetCellType.Text
    case "percent":
      return SpreadsheetCellType.Percent
    case "date":
      return SpreadsheetCellType.Date
    default:
      return SpreadsheetCellType.General
  }
}

export const getCellIndex = (spreadsheetInstance: SpreadsheetInstance, cellName: string): CellIndex => {
  const {row: rowIndex, col: columnIndex} = spreadsheetInstance.getCellIndex(cellName)
  return {rowIndex, columnIndex}
}

export const getCellRange = (spreadsheetInstance: SpreadsheetInstance, cellRangeName: string): CellRange => {
  const {start, end} = spreadsheetInstance.getCellIndex(cellRangeName)
  return {
    start: {
      rowIndex: start.row,
      columnIndex: start.col
    },
    end: {
      rowIndex: end.row,
      columnIndex: end.col
    }
  }
}

export const getSheetDimensions = (cells: SpreadsheetCell[], defaultColumnCount: number, defaultRowCount: number) =>
  cells?.reduce(
    (accumulator, cell) => ({
      columnsCount: cell.columnIndex > accumulator.columnsCount - 1 ? cell.columnIndex : accumulator.columnsCount,
      rowsCount: cell.rowIndex > accumulator.rowsCount - 1 ? cell.rowIndex : accumulator.rowsCount
    }),
    {rowsCount: defaultRowCount, columnsCount: defaultColumnCount}
  )

export const getCellValueWithFormula = (formula: string | string[] | undefined, value: any) => {
  if (formula !== undefined && formula !== null) {
    return `=${formula}`
  }

  if (value !== null && value !== undefined) {
    return value.toString()
  }

  return ""
}

export const serializeCells = (spreadsheetInstance: SpreadsheetInstance): SerializedCell[] => {
  const sheets = spreadsheetInstance.serialize().sheets as DhxSheet[]
  const dhxCells = sheets[0]?.data ?? []

  return dhxCells.map(({cell: cellName, format, value}) => {
    const {row: rowIndex, col: columnIndex} = spreadsheetInstance.getCellIndex(cellName)
    const sanitizedValue = isDefined(value) ? value.toString() : ""
    const style = spreadsheetInstance.getStyle(cellName) as {[key: string]: string}
    const sanitizedStyle = isEmpty(style) ? null : style

    return {
      rowIndex,
      columnIndex,
      cellType: toSpreadsheetCellType(format),
      value: sanitizedValue,
      style: sanitizedStyle
    }
  })
}

export const isCellRangeName = (cellNameOrCellRange: string) => cellNameOrCellRange.includes(":")

export const formulaNames = [
  {en: "SUM", de: "SUMME"},
  {en: "PRODUCT", de: "PRODUKT"},
  {en: "AVERAGE/AVG", de: "MITTELWERT"},
  {en: "COUNT", de: "ANZAHL"},
  {en: "COUNTA", de: "ANZAHL2"},
  {en: "COUNTIF", de: "ZÄHLENWENN"},
  {en: "SUMIF", de: "SUMMEWENN"},
  {en: "IF", de: "WENN"},
  {en: "VLOOKUP", de: "SVERWEIS"},
  {en: "ROUND", de: "RUNDEN"},
  {en: "MODE.SNGL", de: "MODUS.EINF"},
  {en: "SQRT", de: "WURZEL"},
  {en: "POWER", de: "POTENZ"}
]

export const getFormulaExamples = () => formulaNames.map(formulaName => `${formulaName.de} - ${formulaName.en}`)

export const batchStyleChanges = (onStyleChangeBatch: (changes: Record<string, DhxCellStyle>) => void) => {
  let changes: Record<string, DhxCellStyle> = {}
  let timeout: number | null = null

  return (cellName: string, value: DhxCellStyle) => {
    if (timeout !== null) {
      window.clearTimeout(timeout)
    }

    timeout = window.setTimeout(() => {
      onStyleChangeBatch(changes)
      changes = {}
    }, 500)

    changes[cellName] = value
  }
}
