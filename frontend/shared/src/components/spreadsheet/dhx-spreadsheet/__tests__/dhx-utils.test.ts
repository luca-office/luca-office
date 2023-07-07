import {SpreadsheetCellType} from "../../../../graphql/generated/globalTypes"
import {SpreadsheetCell} from "../../../../models"
import {spreadsheetsMock} from "../../__mocks__/spreadsheets.mock"
import {
  defaultSpreadsheetColumnsCount,
  defaultSpreadsheetRowsCount,
  getSheetDimensions,
  indexToCellName,
  indexToColumnName,
  toDhxCellFormat,
  toDhxData,
  toSpreadsheetCellType
} from "../dhx-utils"

describe("dhx-utils", () => {
  it("should getSheetDimensions", () => {
    expect(getSheetDimensions(spreadsheetsMock[1].cells, 0, 0)).toEqual({rowsCount: 4, columnsCount: 6})
    expect(getSheetDimensions([], 0, 0)).toEqual({rowsCount: 0, columnsCount: 0})
    expect(
      getSheetDimensions(spreadsheetsMock[1].cells, defaultSpreadsheetColumnsCount, defaultSpreadsheetRowsCount)
    ).toEqual({
      rowsCount: defaultSpreadsheetRowsCount,
      columnsCount: defaultSpreadsheetColumnsCount
    })
    expect(
      getSheetDimensions(
        [
          ...spreadsheetsMock[1].cells,
          {
            __typename: "SpreadsheetCell",
            id: "bigger",
            cellType: SpreadsheetCellType.Date,
            spreadsheetId: "123",
            rowIndex: 200,
            columnIndex: 100,
            value: "123",
            style: null
          }
        ],
        defaultSpreadsheetColumnsCount,
        defaultSpreadsheetRowsCount
      )
    ).toEqual({
      rowsCount: 200,
      columnsCount: 100
    })
  })

  it("should convert backend cells to DHX cells", () => {
    const cell: SpreadsheetCell = {
      __typename: "SpreadsheetCell",
      id: "123",
      rowIndex: 0,
      columnIndex: 0,
      spreadsheetId: "123",
      cellType: SpreadsheetCellType.Number,
      value: "123",
      style: null
    }

    const cell2: SpreadsheetCell = {
      __typename: "SpreadsheetCell",
      id: "123",
      rowIndex: 0,
      columnIndex: 29,
      spreadsheetId: "123",
      cellType: SpreadsheetCellType.Number,
      value: "123",
      style: null
    }

    const cell3: SpreadsheetCell = {
      __typename: "SpreadsheetCell",
      id: "123",
      rowIndex: 1,
      columnIndex: 1,
      spreadsheetId: "123",
      cellType: SpreadsheetCellType.Date,
      value: "1.1.2020",
      style: '{ "background" : "#EA5D00" }'
    }

    expect(toDhxData([]).data).toEqual([])
    expect(toDhxData([cell]).data).toEqual([{cell: "A1", value: "123", format: "number", css: undefined}])
    expect(toDhxData([cell2]).data).toEqual([{cell: "AD1", value: "123", format: "number", css: undefined}])
    expect(toDhxData([cell3]).data).toEqual([{cell: "B2", value: "1.1.2020", format: "date", css: "dhx-cell-1-1"}])
  })

  it("should convertSheetFormatToCellFormat", () => {
    expect(toSpreadsheetCellType("common")).toBe(SpreadsheetCellType.General)
    expect(toSpreadsheetCellType("currency")).toBe(SpreadsheetCellType.Currency)
  })

  it("should convertCellFormatToSheetFormat", () => {
    expect(toDhxCellFormat(SpreadsheetCellType.General)).toBe("common")
    expect(toDhxCellFormat(SpreadsheetCellType.Currency)).toBe("currency")
  })

  it("should convert column index to column name", () => {
    expect(indexToColumnName(0)).toBe("A")
    expect(indexToColumnName(23)).toBe("X")
    expect(indexToColumnName(30)).toBe("AE")
  })

  it("should convert cell index to cell name", () => {
    expect(indexToCellName({rowIndex: 0, columnIndex: 0})).toBe("A1")
    expect(indexToCellName({rowIndex: 100, columnIndex: 20})).toBe("U101")
    expect(indexToCellName({rowIndex: 67, columnIndex: 52})).toBe("BA68")
  })
})
