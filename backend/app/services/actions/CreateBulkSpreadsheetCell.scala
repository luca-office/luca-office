package services.actions

import database.DatabaseContext
import database.generated.public.SpreadsheetCell
import models.SpreadsheetCellCreation
import services.converters.SpreadsheetCellConverter.toSpreadsheetCell

import scala.concurrent.ExecutionContext

trait CreateBulkSpreadsheetCell {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkSpreadsheetCellAction(creations: Seq[SpreadsheetCellCreation]): IO[Seq[SpreadsheetCell], Effect.Write] =
    runIO(createBulkSpreadsheetCellQuotation(creations))

  def createBulkSpreadsheetCellQuotation(creations: Seq[SpreadsheetCellCreation]) =
    quote(
      liftQuery(creations.map(toSpreadsheetCell))
        .foreach(spreadsheetCell =>
          query[SpreadsheetCell]
            .insert(spreadsheetCell)
            .returning(spreadsheetCell => spreadsheetCell)))
}
