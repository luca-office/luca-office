package services.converters

import database.generated.public.SpreadsheetCell
import io.circe.Json
import io.circe.parser.parse
import models.SpreadsheetCellCreation

import java.util.UUID

object SpreadsheetCellConverter {

  def toSpreadsheetCell(creation: SpreadsheetCellCreation): SpreadsheetCell =
    SpreadsheetCell(
      id = UUID.randomUUID(),
      cellType = creation.cellType,
      value = creation.value,
      rowIndex = creation.rowIndex,
      columnIndex = creation.columnIndex,
      style = creation.style.map(style => parse(style).getOrElse(Json.Null)),
      spreadsheetId = creation.spreadsheetId
    )

  def toSpreadsheetCellCreation(spreadsheetCell: SpreadsheetCell): SpreadsheetCellCreation =
    SpreadsheetCellCreation(
      cellType = spreadsheetCell.cellType,
      value = spreadsheetCell.value,
      rowIndex = spreadsheetCell.rowIndex,
      columnIndex = spreadsheetCell.columnIndex,
      style = spreadsheetCell.style.map(_.toString),
      spreadsheetId = spreadsheetCell.spreadsheetId
    )
}
