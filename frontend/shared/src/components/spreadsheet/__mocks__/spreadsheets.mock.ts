import {SpreadsheetCell, ViewerSpreadsheet} from "../../../models"
import {createUUID} from "../../../utils"
import {SpreadsheetCellType} from "../../../graphql/generated/globalTypes"

export const generateSpreadsheetConfig = (rowsCount = 99, columnsCount = 24): {cells: SpreadsheetCell[]} => {
  let xCount = 1
  let yCount = 1
  const cells: SpreadsheetCell[] = []

  while (xCount <= columnsCount) {
    while (yCount <= rowsCount) {
      cells.push({
        __typename: "SpreadsheetCell",
        id: createUUID(),
        columnIndex: xCount,
        rowIndex: yCount,
        value: `${xCount + yCount}`,
        cellType: SpreadsheetCellType.Number,
        style: null,
        spreadsheetId: "123"
      })

      yCount++
    }

    xCount++
    yCount = 1
  }

  return {cells}
}

const config = generateSpreadsheetConfig()

export const spreadsheetsMock: ViewerSpreadsheet[] = [
  {
    id: "1233-abdc-5fer-grfs",
    title: "default sheet",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    filename: "spreadsheet-file",
    fileSize: -1,
    cells: config.cells
  },
  {
    id: "1233-abdc-5fer-grfd",
    title: "diverse cols and rows",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    filename: "spreadsheet-file",
    fileSize: -1,
    cells: [
      {
        __typename: "SpreadsheetCell",
        id: `cell-1211`,
        columnIndex: 3,
        rowIndex: 4,
        value: "test",
        cellType: SpreadsheetCellType.Text,
        style: null,
        spreadsheetId: "123"
      },
      {
        __typename: "SpreadsheetCell",
        id: `cell-122`,
        columnIndex: 3,
        rowIndex: 3,
        value: "120",
        cellType: SpreadsheetCellType.Currency,
        style: null,
        spreadsheetId: "123"
      },
      {
        __typename: "SpreadsheetCell",
        id: `cell-122`,
        columnIndex: 2,
        rowIndex: 3,
        value: "120",
        cellType: SpreadsheetCellType.Number,
        style: null,
        spreadsheetId: "123"
      },
      {
        __typename: "SpreadsheetCell",
        id: `cell-12323`,
        columnIndex: 6,
        rowIndex: 3,
        value: "120",
        cellType: SpreadsheetCellType.Percent,
        style: null,
        spreadsheetId: "123"
      },
      {
        __typename: "SpreadsheetCell",
        id: `cell-12233`,
        columnIndex: 5,
        rowIndex: 3,
        value: "hello world",
        cellType: SpreadsheetCellType.Text,
        style: null,
        spreadsheetId: "123"
      },
      {
        __typename: "SpreadsheetCell",
        id: `cell-1222323`,
        columnIndex: 5,
        rowIndex: 4,
        value: "01.01.2020",
        cellType: SpreadsheetCellType.Date,
        style: null,
        spreadsheetId: "123"
      }
    ]
  }
]
