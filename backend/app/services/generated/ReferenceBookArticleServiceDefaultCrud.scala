package services.generated

import java.util.UUID

import database.DatabaseContext
import database.generated.public.ReferenceBookArticle
import models.ReferenceBookArticleUpdate
import services.Utils.defaultErrorHandler
import utils.DateUtils

import scala.concurrent.{ExecutionContext, Future}

trait DefaultAllReferenceBookArticle {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allReferenceBookArticles(referenceBookChapterId: UUID): Future[Seq[ReferenceBookArticle]] =
    run(allReferenceBookArticlesQuotation(referenceBookChapterId))

  def allReferenceBookArticlesQuotation(referenceBookChapterId: UUID) =
    quote(query[ReferenceBookArticle].filter(_.referenceBookChapterId == lift(referenceBookChapterId)))
}

trait DefaultFindReferenceBookArticle {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def find(id: UUID): Future[Option[ReferenceBookArticle]] =
    run(findQuotation(id)).map(_.headOption)

  def findQuotation(id: UUID) =
    quote(query[ReferenceBookArticle].filter(_.id == lift(id)))
}

trait DefaultUpdateReferenceBookArticle {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def update(id: UUID, update: ReferenceBookArticleUpdate): Future[ReferenceBookArticle] =
    run(updateQuotation(id, update))
      .recover(defaultErrorHandler)

  def updateQuotation(id: UUID, update: ReferenceBookArticleUpdate) =
    quote(
      query[ReferenceBookArticle]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.title -> lift(update.title)
        )
        .returning(referenceBookArticle => referenceBookArticle))
}

trait DefaultDeleteReferenceBookArticle {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def delete(id: UUID): Future[UUID] =
    run(deleteQuotation(id))

  def deleteQuotation(id: UUID) =
    quote(
      query[ReferenceBookArticle]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
