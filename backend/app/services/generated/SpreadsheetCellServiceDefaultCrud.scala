package services.generated

import database.DatabaseContext
import database.generated.public.SpreadsheetCell
import models.SpreadsheetCellCreation
import services.converters.SpreadsheetCellConverter.toSpreadsheetCell

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllSpreadsheetCell {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allSpreadsheetCellsAction(spreadsheetId: UUID) =
    runIO(allSpreadsheetCellsQuotation(spreadsheetId))

  def allSpreadsheetCellsQuotation(spreadsheetId: UUID) =
    quote(query[SpreadsheetCell].filter(_.spreadsheetId == lift(spreadsheetId)))
}

trait DefaultFindSpreadsheetCell {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findAction(id: UUID) =
    runIO(findQuotation(id)).map(_.headOption)

  def findQuotation(id: UUID) =
    quote(query[SpreadsheetCell].filter(_.id == lift(id)))
}

trait DefaultCreateSpreadsheetCell {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createAction(creation: SpreadsheetCellCreation) =
    runIO(createQuotation(creation))

  def createQuotation(creation: SpreadsheetCellCreation) =
    quote(
      query[SpreadsheetCell]
        .insert(lift(toSpreadsheetCell(creation)))
        .returning(spreadsheetCell => spreadsheetCell))
}

trait DefaultDeleteSpreadsheetCell {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteAction(id: UUID) =
    runIO(deleteQuotation(id))

  def deleteQuotation(id: UUID) =
    quote(
      query[SpreadsheetCell]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
