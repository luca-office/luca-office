package models

import enums.SpreadsheetCellType

import java.util.UUID

case class SpreadsheetCellCreation(
    cellType: SpreadsheetCellType,
    value: String,
    rowIndex: Int,
    columnIndex: Int,
    style: Option[String],
    spreadsheetId: UUID
)

case class SpreadsheetCellUpdate(
    cellType: SpreadsheetCellType,
    value: String,
    rowIndex: Int,
    columnIndex: Int,
    style: Option[String]
)
