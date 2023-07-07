package services.generated

import database.DatabaseContext
import database.generated.public.File
import models.{FileCreation, FileUpdate}
import services.converters.FileConverter.toFile
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultFindFile {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findFileAction(id: UUID) =
    runIO(findFileQuotation(id)).map(_.headOption)

  def findFileQuotation(id: UUID) =
    quote(query[File].filter(_.id == lift(id)))
}

trait DefaultCreateFile {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createFileAction(creation: FileCreation) =
    runIO(createFileQuotation(creation))

  def createFileQuotation(creation: FileCreation) =
    quote(
      query[File]
        .insert(lift(toFile(creation)))
        .returning(file => file))
}

trait DefaultUpdateFile {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateFileAction(id: UUID, update: FileUpdate) =
    runIO(updateFileQuotation(id, update))

  def updateFileQuotation(id: UUID, update: FileUpdate) =
    quote(
      query[File]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.name -> lift(update.name),
          _.relevance -> lift(update.relevance),
          _.tags -> lift(update.tags),
          _.binaryFileId -> lift(update.binaryFileId),
          _.directoryId -> lift(update.directoryId)
        )
        .returning(file => file))
}

trait DefaultDeleteFile {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteFileAction(id: UUID) =
    runIO(deleteFileQuotation(id))

  def deleteFileQuotation(id: UUID) =
    quote(
      query[File]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
