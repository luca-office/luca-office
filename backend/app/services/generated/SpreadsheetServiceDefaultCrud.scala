package services.generated

import database.DatabaseContext
import database.generated.public.Spreadsheet
import models.SpreadsheetCreation
import services.converters.SpreadsheetConverter.toSpreadsheet

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllSpreadsheet {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def allSpreadsheetsAction: IO[Seq[Spreadsheet], Effect.Read] =
    runIO(allSpreadsheetsQuotation)

  def allSpreadsheetsQuotation =
    quote(query[Spreadsheet])
}

trait DefaultFindSpreadsheet {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def findSpreadsheetAction(id: UUID) =
    runIO(findSpreadsheetQuotation(id)).map(_.headOption)

  def findSpreadsheetQuotation(id: UUID) =
    quote(query[Spreadsheet].filter(_.id == lift(id)))
}

trait DefaultCreateSpreadsheet {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def createSpreadsheetAction(creation: SpreadsheetCreation) =
    runIO(createQuotation(creation))

  def createQuotation(creation: SpreadsheetCreation) =
    quote(
      query[Spreadsheet]
        .insert(lift(toSpreadsheet(creation)))
        .returning(spreadsheet => spreadsheet))
}

trait DefaultDeleteSpreadsheet {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteSpreadsheetAction(id: UUID) =
    runIO(deleteSpreadsheetQuotation(id))

  def deleteSpreadsheetQuotation(id: UUID) =
    quote(
      query[Spreadsheet]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
