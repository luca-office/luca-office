package services

import java.util.UUID

import database.DatabaseContext
import database.generated.public.ReferenceBookArticle
import javax.inject.Inject
import models.ReferenceBookArticleCreation
import services.Utils.defaultErrorHandler
import services.converters.ReferenceBookArticleConverter.toReferenceBookArticle
import services.generated._
import utils.DateUtils

import scala.concurrent.{ExecutionContext, Future}

class ReferenceBookArticleService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllReferenceBookArticle
    with DefaultFindReferenceBookArticle
    with DefaultUpdateReferenceBookArticle
    with DefaultDeleteReferenceBookArticle {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findAction(id: UUID) =
    runIO(findQuotation(id)).flatMap {
      case Nil => IO.failed(CustomError(s"Couldn't find reference book article $id"))
      case Seq(article) => IO.successful(article)
    }

  def create(creation: ReferenceBookArticleCreation): Future[ReferenceBookArticle] =
    performIO(createAction(creation))
      .recover(defaultErrorHandler)

  def createAction(creation: ReferenceBookArticleCreation) =
    runIO(maximumPositionQuotation(creation.referenceBookChapterId))
      .flatMap(maximumPosition => runIO(createQuotation(creation, maximumPosition.map(_ + 1).getOrElse(1))))
      .transactional

  def createQuotation(creation: ReferenceBookArticleCreation, position: BigDecimal) =
    quote(
      query[ReferenceBookArticle]
        .insert(lift(toReferenceBookArticle(creation, position)))
        .returning(referenceBookArticle => referenceBookArticle))

  def maximumPositionQuotation(referenceBookChapterId: UUID) =
    quote(
      query[ReferenceBookArticle]
        .filter(_.referenceBookChapterId == lift(referenceBookChapterId))
        .map(_.position)
        .max)

  def reposition(id: UUID, predecessorId: Option[UUID]): Future[ReferenceBookArticle] =
    if (predecessorId.contains(id))
      Future.failed(CustomError("id and predecessorId must not be equal"))
    else
      performIO(repositionAction(id, predecessorId).transactional)
        .recover(defaultErrorHandler)

  def repositionAction(id: UUID, predecessorId: Option[UUID]) =
    for {
      article <- findAction(id)
      position <- calculatePositionAction(predecessorId, article.referenceBookChapterId)
      updatedArticle <- updatePositionAction(id, position)
    } yield updatedArticle

  def calculatePositionAction(predecessorId: Option[UUID], referenceBookChapterId: UUID) =
    predecessorId match {
      case Some(predId) =>
        val predecessorAction = runIO(
          query[ReferenceBookArticle]
            .filter(_.id == lift(predId))
            .filter(_.referenceBookChapterId == lift(referenceBookChapterId))
            .take(1)
            .map(_.position))

        predecessorAction.flatMap {
          case Seq(predecessorPosition) =>
            runIO(
              query[ReferenceBookArticle]
                .filter(_.position > lift(predecessorPosition))
                .filter(_.referenceBookChapterId == lift(referenceBookChapterId))
                .sortBy(_.position)
                .take(1)
                .map(_.position))
              .map {
                case Seq(successorPosition) =>
                  (predecessorPosition + successorPosition) / 2
                case Nil =>
                  predecessorPosition + 1
              }
          case _ =>
            IO.failed(CustomError(s"Couldn't find predecessor $predecessorId article in reference book"))
        }

      case _ =>
        runIO(
          quote(
            query[ReferenceBookArticle]
              .filter(_.referenceBookChapterId == lift(referenceBookChapterId))
              .sortBy(_.position)
              .take(1)
              .map(_.position)))
          .flatMap {
            case Seq(position) => IO.successful(position / 2)
            case _ => IO.failed(CustomError(s"Couldn't find any article"))
          }
    }

  def updatePositionAction(id: UUID, position: BigDecimal) =
    runIO(
      quote(
        query[ReferenceBookArticle]
          .filter(_.id == lift(id))
          .update(
            _.modifiedAt -> lift(DateUtils.now),
            _.position -> lift(position)
          )
          .returning(referenceBookArticle => referenceBookArticle)))
}

trait CreateBulkReferenceBookArticle {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkReferenceBookArticleQuotation(creations: Seq[(ReferenceBookArticleCreation, BigDecimal)]) =
    quote(
      liftQuery(creations.map { case (creation, position) => toReferenceBookArticle(creation, position) })
        .foreach(referenceBookArticle =>
          query[ReferenceBookArticle]
            .insert(referenceBookArticle)
            .returning(referenceBookArticle => referenceBookArticle)))
}
