package services.generated

import database.DatabaseContext
import database.generated.public.Directory
import models.{DirectoryCreation, DirectoryUpdate}
import services.Utils.defaultErrorHandler
import services.converters.DirectoryConverter.toDirectory
import utils.DateUtils

import java.util.UUID
import scala.concurrent.{ExecutionContext, Future}

trait DefaultFindDirectory {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def find(id: UUID): Future[Option[Directory]] =
    run(findQuotation(id)).map(_.headOption)

  def findQuotation(id: UUID) =
    quote(query[Directory].filter(_.id == lift(id)))
}

trait DefaultCreateDirectory {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def create(creation: DirectoryCreation): Future[Directory] =
    run(createDirectoryQuotation(creation))
      .recover(defaultErrorHandler)

  def createDirectoryQuotation(creation: DirectoryCreation) =
    quote(
      query[Directory]
        .insert(lift(toDirectory(creation)))
        .returning(directory => directory))
}

trait DefaultUpdateDirectory {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def update(id: UUID, update: DirectoryUpdate): Future[Directory] =
    run(updateQuotation(id, update))
      .recover(defaultErrorHandler)

  def updateQuotation(id: UUID, update: DirectoryUpdate) =
    quote(
      query[Directory]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.name -> lift(update.name),
          _.parentDirectoryId -> lift(update.parentDirectoryId)
        )
        .returning(directory => directory))
}

trait DefaultDeleteDirectory {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def delete(id: UUID): Future[UUID] =
    run(deleteQuotation(id))

  def deleteQuotation(id: UUID) =
    quote(
      query[Directory]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
