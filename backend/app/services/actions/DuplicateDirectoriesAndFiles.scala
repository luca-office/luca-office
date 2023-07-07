package services.actions

import database.DatabaseContext
import database.generated.public.{Directory, File, Spreadsheet, TextDocument}
import services.converters.DirectoryConverter.toDirectoryCreation
import services.converters.FileConverter.toFileCreation
import services.converters.SpreadsheetCellConverter.toSpreadsheetCellCreation
import services.converters.SpreadsheetConverter.toSpreadsheetCreation
import services.converters.TextDocumentConverter.toTextDocumentCreation
import services.generated.DefaultAllSpreadsheetCell

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DuplicateDirectoriesAndFiles
    extends AllDirectory
    with CreateBulkDirectory
    with AllFile
    with CreateBulkFile
    with CreateBulkSpreadsheet
    with DefaultAllSpreadsheetCell
    with CreateBulkSpreadsheetCell
    with CreateBulkTextDocument {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def duplicateDirectoriesAndFilesForScenarioAction(
      scenarioId: UUID,
      duplicatedScenarioId: UUID,
      fileIdMapping: UUID => UUID,
      emailIdMapping: UUID => UUID): IO[Unit, Effect.Read with Effect.Write] =
    allDirectoriesForScenarioAction(scenarioId)
      .flatMap { directories =>
        val (directoryIdMapping, directoryCreationPairs) = createDirectoryMappingAndCreationPairs(
          directories = directories,
          duplicatedScenarioId = Some(duplicatedScenarioId),
          duplicatedSampleCompanyId = None)

        createBulkDirectoryAction(directoryCreationPairs)
          .flatMap(_ => duplicateFilesForScenarioAction(scenarioId, directoryIdMapping, fileIdMapping, emailIdMapping))
      }

  def duplicateDirectoriesAndFilesForSampleCompanyAction(
      sampleCompanyId: UUID,
      duplicatedSampleCompanyId: UUID,
      customFileIdMapping: UUID => Option[UUID]): IO[Unit, Effect.Read with Effect.Write] =
    allDirectoriesForSampleCompanyAction(sampleCompanyId)
      .flatMap { directories =>
        val (directoryIdMapping, directoryCreationPairs) = createDirectoryMappingAndCreationPairs(
          directories = directories,
          duplicatedScenarioId = None,
          duplicatedSampleCompanyId = Some(duplicatedSampleCompanyId))

        createBulkDirectoryAction(directoryCreationPairs)
          .flatMap(_ => duplicateFilesForSampleCompanyAction(sampleCompanyId, directoryIdMapping, customFileIdMapping))
      }

  private def createDirectoryMappingAndCreationPairs(
      directories: Seq[Directory],
      duplicatedScenarioId: Option[UUID],
      duplicatedSampleCompanyId: Option[UUID]) = {
    val directoryIdMapping = directories.map(_.id -> UUID.randomUUID()).toMap
    val directoryCreationPairs = directories
      .map(directory =>
        directory.copy(
          id = directoryIdMapping(directory.id),
          parentDirectoryId = directory.parentDirectoryId.map(directoryIdMapping),
          scenarioId = duplicatedScenarioId,
          sampleCompanyId = duplicatedSampleCompanyId
        ))
      .map(copiedDirectory => (toDirectoryCreation(copiedDirectory), copiedDirectory.id))

    (directoryIdMapping, directoryCreationPairs)
  }

  private def duplicateFilesForScenarioAction(
      scenarioId: UUID,
      directoryIdMapping: UUID => UUID,
      fileIdMapping: UUID => UUID,
      emailIdMapping: UUID => UUID) =
    allFilesForScenarioAction(scenarioId).flatMap(
      duplicateFilesAction(_, directoryIdMapping, Some((id: UUID) => Some(fileIdMapping(id))), Some(emailIdMapping)))

  private def duplicateFilesForSampleCompanyAction(
      sampleCompanyId: UUID,
      directoryIdMapping: UUID => UUID,
      customFileIdMapping: UUID => Option[UUID]) =
    allFilesForSampleCompanyAction(sampleCompanyId).flatMap(
      duplicateFilesAction(_, directoryIdMapping, Some(customFileIdMapping), None))

  private def duplicateFilesAction(
      files: Seq[File],
      directoryIdMapping: UUID => UUID,
      customFileIdMapping: Option[UUID => Option[UUID]],
      emailIdMapping: Option[UUID => UUID]) = {
    val spreadsheetFileIds = files.filter(_.spreadsheetId.isDefined).map(_.spreadsheetId.get)
    val spreadsheetIdMapping = spreadsheetFileIds.map(_ -> UUID.randomUUID()).toMap
    val textDocumentFileIds = files.filter(_.textDocumentId.isDefined).map(_.textDocumentId.get)
    val textDocumentIdMapping = textDocumentFileIds.map(_ -> UUID.randomUUID()).toMap

    val fileIdMapping = files
      .map(file =>
        file.id -> customFileIdMapping
          .map(customIdMapping => customIdMapping(file.id).getOrElse(UUID.randomUUID()))
          .getOrElse(UUID.randomUUID()))
      .toMap
    val fileCreationPairs = files.map(file =>
      (
        toFileCreation(file).copy(
          directoryId = file.directoryId.map(directoryIdMapping),
          emailId = emailIdMapping.flatMap(mapping => file.emailId.map(mapping)),
          spreadsheetId = file.spreadsheetId.map(spreadsheetIdMapping),
          textDocumentId = file.textDocumentId.map(textDocumentIdMapping)
        ),
        fileIdMapping(file.id)))

    for {
      _ <- duplicateSpreadsheetsAction(spreadsheetFileIds, spreadsheetIdMapping)
      _ <- duplicateTextDocumentsAction(textDocumentFileIds, textDocumentIdMapping)
      _ <- createBulkFileAction(fileCreationPairs)
    } yield ()
  }

  private def duplicateSpreadsheetsAction(spreadsheetIds: Seq[UUID], idMapping: UUID => UUID) =
    runIO(query[Spreadsheet].filter(spreadsheet => liftQuery(spreadsheetIds).contains(spreadsheet.id)))
      .flatMap { spreadsheets =>
        val creationPairs = spreadsheets
          .map(spreadsheet => (toSpreadsheetCreation(spreadsheet), idMapping(spreadsheet.id)))
        createBulkSpreadsheetAction(creationPairs).flatMap(_ =>
          IO.sequence(spreadsheets.map(spreadsheet =>
            duplicateSpreadsheetCellsAction(spreadsheet.id, idMapping(spreadsheet.id)))))
      }

  private def duplicateSpreadsheetCellsAction(spreadsheetId: UUID, duplicatedSpreadsheetId: UUID) =
    allSpreadsheetCellsAction(spreadsheetId).flatMap(spreadsheetCells =>
      createBulkSpreadsheetCellAction(spreadsheetCells.map(spreadsheetCell =>
        toSpreadsheetCellCreation(spreadsheetCell).copy(spreadsheetId = duplicatedSpreadsheetId))))

  private def duplicateTextDocumentsAction(textDocumentIds: Seq[UUID], idMapping: UUID => UUID) =
    runIO(query[TextDocument].filter(textDocument => liftQuery(textDocumentIds).contains(textDocument.id)))
      .flatMap(textDocuments =>
        createBulkTextDocumentAction(
          textDocuments.map(textDocument => (toTextDocumentCreation(textDocument), idMapping(textDocument.id)))))
}
