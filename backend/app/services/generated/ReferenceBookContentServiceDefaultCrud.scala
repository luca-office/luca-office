package services.generated

import java.util.UUID

import database.DatabaseContext
import database.generated.public.ReferenceBookContent
import models.ReferenceBookContentUpdate
import services.Utils.defaultErrorHandler
import utils.DateUtils

import scala.concurrent.{ExecutionContext, Future}

trait DefaultAllReferenceBookContent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allReferenceBookContents(referenceBookArticleId: UUID): Future[Seq[ReferenceBookContent]] =
    run(allReferenceBookContentsQuotation(referenceBookArticleId))

  def allReferenceBookContentsQuotation(referenceBookArticleId: UUID) =
    quote(query[ReferenceBookContent].filter(_.referenceBookArticleId == lift(referenceBookArticleId)))
}

trait DefaultFindReferenceBookContent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def find(id: UUID): Future[Option[ReferenceBookContent]] =
    run(findQuotation(id)).map(_.headOption)

  def findQuotation(id: UUID) =
    quote(query[ReferenceBookContent].filter(_.id == lift(id)))
}

trait DefaultUpdateReferenceBookContent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def update(id: UUID, update: ReferenceBookContentUpdate): Future[ReferenceBookContent] =
    run(updateQuotation(id, update))
      .recover(defaultErrorHandler)

  def updateQuotation(id: UUID, update: ReferenceBookContentUpdate) =
    quote(
      query[ReferenceBookContent]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.text -> lift(update.text),
          _.imageBinaryFileId -> lift(update.imageBinaryFileId),
          _.videoBinaryFileId -> lift(update.videoBinaryFileId)
        )
        .returning(referenceBookContent => referenceBookContent))
}

trait DefaultDeleteReferenceBookContent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def delete(id: UUID): Future[UUID] =
    run(deleteQuotation(id))

  def deleteQuotation(id: UUID) =
    quote(
      query[ReferenceBookContent]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
