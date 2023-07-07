package services

import database.DatabaseContext
import database.generated.public.SpreadsheetCell
import models.SpreadsheetCellCreation
import services.Utils.defaultErrorHandler
import services.actions.CreateBulkSpreadsheetCell
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class SpreadsheetCellService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllSpreadsheetCell
    with DefaultFindSpreadsheetCell
    with DefaultCreateSpreadsheetCell
    with DefaultDeleteSpreadsheetCell
    with CreateBulkSpreadsheetCell {
  val context = databaseContext

  import context._

  def all(spreadsheetId: UUID): Future[Seq[SpreadsheetCell]] =
    performIO(allSpreadsheetCellsAction(spreadsheetId))

  def find(id: UUID): Future[Option[SpreadsheetCell]] =
    performIO(findAction(id))

  def create(creation: SpreadsheetCellCreation): Future[SpreadsheetCell] =
    performIO(createAction(creation))
      .recover(defaultErrorHandler)

  def delete(id: UUID): Future[UUID] =
    performIO(deleteAction(id))

  def createBulkSpreadsheetCell(creations: Seq[SpreadsheetCellCreation]): Future[Seq[SpreadsheetCell]] =
    performIO(createBulkSpreadsheetCellAction(creations))
      .recover(defaultErrorHandler)
}

trait SpreadsheetCellServiceActions {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def deleteForSpreadsheetAction(spreadsheetId: UUID): IO[Long, Effect.Write] =
    runIO(query[SpreadsheetCell].filter(_.spreadsheetId == lift(spreadsheetId)).delete)
}
