package services

import database.DatabaseContext
import database.generated.public.File
import models.{FileCreation, FileUpdate}
import services.Utils.defaultErrorHandler
import services.actions.AllFile
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class FileService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends AllFile
    with DefaultFindFile
    with DefaultCreateFile
    with DefaultUpdateFile
    with DefaultDeleteFile
    with DefaultDeleteSpreadsheet
    with DefaultDeleteTextDocument
    with QuillUtils {
  val context = databaseContext

  import context._

  def allFilesForScenario(scenarioId: UUID): Future[Seq[File]] =
    performIO(allFilesForScenarioAction(scenarioId))

  def allFilesForSampleCompany(sampleCompanyId: UUID): Future[Seq[File]] =
    performIO(allFilesForSampleCompanyAction(sampleCompanyId))

  def find(id: UUID): Future[Option[File]] =
    performIO(findFileAction(id))

  def create(creation: FileCreation): Future[File] =
    performIO(createFileAction(creation)).recover(defaultErrorHandler)

  def update(id: UUID, update: FileUpdate): Future[File] =
    performIO(updateFileAction(id, update)).recover(defaultErrorHandler)

  def delete(id: UUID): Future[UUID] = {
    val action = for {
      file <- findFileAction(id).flatMap(liftIOOrFail(EntityNotFound))
      deletedFileId <- deleteFileAction(id)
      _ <- file.spreadsheetId match {
        case Some(spreadsheetId) => deleteSpreadsheetAction(spreadsheetId).map(_ => ())
        case None => IO.successful(())
      }
      _ <- file.textDocumentId match {
        case Some(textDocumentId) => deleteTextDocumentAction(textDocumentId).map(_ => ())
        case None => IO.successful(())
      }
    } yield deletedFileId

    performIO(action).recover(defaultErrorHandler)
  }
}
