package services

import database.DatabaseContext
import database.generated.public.Spreadsheet
import models.{SpreadsheetCellCreation, SpreadsheetCreation}
import services.Utils.defaultErrorHandler
import services.actions.CreateBulkSpreadsheetCell
import services.generated._
import utils.Excel.ExcelFileCell

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class SpreadsheetService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends QuillUtils
    with DefaultFindSpreadsheet
    with DefaultCreateSpreadsheet
    with DefaultDeleteSpreadsheet
    with CreateBulkSpreadsheetCell
    with SpreadsheetCellServiceActions {

  val context = databaseContext

  import context._

  def find(id: UUID): Future[Option[Spreadsheet]] =
    performIO(findSpreadsheetAction(id))

  def create(creation: SpreadsheetCreation): Future[Spreadsheet] =
    performIO(createSpreadsheetAction(creation))
      .recover(defaultErrorHandler)

  def createFromExcelFileCells(creation: SpreadsheetCreation, cells: Seq[ExcelFileCell]): Future[Spreadsheet] =
    performIO(createFromExcelFileCellsAction(creation, cells))
      .recover(defaultErrorHandler)

  private def createFromExcelFileCellsAction(creation: SpreadsheetCreation, cells: Seq[ExcelFileCell]) =
    createSpreadsheetAction(creation)
      .flatMap(spreadsheet =>
        createBulkSpreadsheetCellAction(
          cells.map(cell =>
            SpreadsheetCellCreation(
              cellType = cell.cellType,
              value = cell.value,
              rowIndex = cell.rowIndex,
              columnIndex = cell.columnIndex,
              style = None,
              spreadsheetId = spreadsheet.id
            )))
          .map(_ => spreadsheet))
      .transactional

  def delete(id: UUID): Future[UUID] =
    performIO(deleteSpreadsheetAction(id))

  def updateCells(id: UUID, cellCreations: Seq[SpreadsheetCellCreation]): Future[Spreadsheet] = {
    val action = for {
      spreadsheet <- findSpreadsheetAction(id).flatMap(liftIOOrFail(EntityNotFound))
      _ <- deleteForSpreadsheetAction(id)
      _ <- createBulkSpreadsheetCellAction(cellCreations)
    } yield spreadsheet

    performIO(action.transactional)
  }
}
