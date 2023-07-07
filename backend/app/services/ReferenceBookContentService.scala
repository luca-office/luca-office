package services

import java.util.UUID

import database.DatabaseContext
import database.generated.public.ReferenceBookContent
import javax.inject.Inject
import models.ReferenceBookContentCreation
import services.Utils.defaultErrorHandler
import services.converters.ReferenceBookContentConverter.toReferenceBookContent
import services.generated._
import utils.DateUtils

import scala.concurrent.{ExecutionContext, Future}

class ReferenceBookContentService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllReferenceBookContent
    with DefaultFindReferenceBookContent
    with DefaultUpdateReferenceBookContent
    with DefaultDeleteReferenceBookContent {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findAction(id: UUID) =
    runIO(findQuotation(id)).flatMap {
      case Nil => IO.failed(CustomError(s"Couldn't find reference book content $id"))
      case Seq(content) => IO.successful(content)
    }

  def create(creation: ReferenceBookContentCreation): Future[ReferenceBookContent] =
    performIO(createAction(creation))
      .recover(defaultErrorHandler)

  def createAction(creation: ReferenceBookContentCreation) =
    runIO(maximumPositionQuotation(creation.referenceBookArticleId))
      .flatMap(maximumPosition => runIO(createQuotation(creation, maximumPosition.map(_ + 1).getOrElse(1))))
      .transactional

  def createQuotation(creation: ReferenceBookContentCreation, position: BigDecimal) =
    quote(
      query[ReferenceBookContent]
        .insert(lift(toReferenceBookContent(creation, position)))
        .returning(referenceBookContent => referenceBookContent))

  def maximumPositionQuotation(referenceBookArticleId: UUID) =
    quote(
      query[ReferenceBookContent]
        .filter(_.referenceBookArticleId == lift(referenceBookArticleId))
        .map(_.position)
        .max)

  def reposition(id: UUID, predecessorId: Option[UUID]): Future[ReferenceBookContent] =
    if (predecessorId.contains(id))
      Future.failed(CustomError("id and predecessorId must not be equal"))
    else
      performIO(repositionAction(id, predecessorId).transactional)
        .recover(defaultErrorHandler)

  def repositionAction(id: UUID, predecessorId: Option[UUID]) =
    for {
      content <- findAction(id)
      position <- calculatePositionAction(predecessorId, content.referenceBookArticleId)
      updatedContent <- updatePositionAction(id, position)
    } yield updatedContent

  def calculatePositionAction(predecessorId: Option[UUID], referenceBookArticleId: UUID) =
    predecessorId match {
      case Some(predId) =>
        val predecessorAction = runIO(
          query[ReferenceBookContent]
            .filter(_.id == lift(predId))
            .filter(_.referenceBookArticleId == lift(referenceBookArticleId))
            .take(1)
            .map(_.position))

        predecessorAction.flatMap {
          case Seq(predecessorPosition) =>
            runIO(
              query[ReferenceBookContent]
                .filter(_.position > lift(predecessorPosition))
                .filter(_.referenceBookArticleId == lift(referenceBookArticleId))
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
            IO.failed(CustomError(s"Couldn't find predecessor $predecessorId content in article"))
        }

      case _ =>
        runIO(
          quote(
            query[ReferenceBookContent]
              .filter(_.referenceBookArticleId == lift(referenceBookArticleId))
              .sortBy(_.position)
              .take(1)
              .map(_.position)))
          .flatMap {
            case Seq(position) => IO.successful(position / 2)
            case _ => IO.failed(CustomError(s"Couldn't find any content"))
          }
    }

  def updatePositionAction(id: UUID, position: BigDecimal) =
    runIO(
      quote(
        query[ReferenceBookContent]
          .filter(_.id == lift(id))
          .update(
            _.modifiedAt -> lift(DateUtils.now),
            _.position -> lift(position)
          )
          .returning(referenceBookContent => referenceBookContent)))
}

trait CreateBulkReferenceBookContent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkReferenceBookContentQuotation(creations: Seq[(ReferenceBookContentCreation, BigDecimal)]) =
    quote(
      liftQuery(creations.map { case (creation, position) => toReferenceBookContent(creation, position) })
        .foreach(referenceBookContent =>
          query[ReferenceBookContent]
            .insert(referenceBookContent)
            .returning(referenceBookContent => referenceBookContent)))
}
