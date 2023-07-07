package services.actions

import database.DatabaseContext
import database.generated.public.Spreadsheet
import models.SpreadsheetCreation
import services.converters.SpreadsheetConverter.toSpreadsheet

import java.util.UUID
import scala.concurrent.ExecutionContext

trait CreateBulkSpreadsheet {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkSpreadsheetAction(creationPairs: Seq[(SpreadsheetCreation, UUID)]) =
    runIO(createBulkSpreadsheetQuotation(creationPairs))

  def createBulkSpreadsheetQuotation(creationPairs: Seq[(SpreadsheetCreation, UUID)]) =
    quote(
      liftQuery(creationPairs.map { case (creation, id) => toSpreadsheet(creation).copy(id = id) })
        .foreach(spreadsheet =>
          query[Spreadsheet]
            .insert(spreadsheet)
            .returning(spreadsheet => spreadsheet)))
}
