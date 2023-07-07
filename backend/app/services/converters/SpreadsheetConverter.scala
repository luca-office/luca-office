package services.converters

import database.generated.public.Spreadsheet
import models.SpreadsheetCreation
import utils.DateUtils

import java.util.UUID

object SpreadsheetConverter {

  def toSpreadsheet(creation: SpreadsheetCreation): Spreadsheet =
    Spreadsheet(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      filename = creation.filename,
      fileSize = creation.fileSize
    )

  def toSpreadsheetCreation(spreadsheet: Spreadsheet): SpreadsheetCreation =
    SpreadsheetCreation(
      filename = spreadsheet.filename,
      fileSize = spreadsheet.fileSize
    )
}
