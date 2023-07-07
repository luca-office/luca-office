package services

import com.github.jasync.sql.db.postgresql.exceptions.GenericDatabaseException
import database.DatabaseContext
import database.generated.public.CodingDimension
import models.{CodingDimensionCreation, CodingDimensionUpdate}
import services.Utils.{defaultErrorHandler, isForeignKeyConstraintViolation}
import services.converters.CodingDimensionConverter.toCodingDimension
import services.generated._
import utils.DateUtils

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class CodingDimensionService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllCodingDimension
    with DefaultFindCodingDimension
    with DefaultUpdateCodingDimension
    with DefaultDeleteCodingDimension
    with QuillUtils {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all(modelId: UUID): Future[Seq[CodingDimension]] =
    performIO(allCodingDimensionsAction(modelId))

  def find(id: UUID): Future[Option[CodingDimension]] =
    performIO(findCodingDimensionAction(id))

  def create(creation: CodingDimensionCreation) =
    performIO(createAction(creation)).recover(defaultErrorHandler)

  def createAction(creation: CodingDimensionCreation) =
    runIO(maximumPositionQuotation(creation.parentDimensionId))
      .flatMap(maximumPosition => runIO(createQuotation(creation, maximumPosition.map(_ + 1).getOrElse(1))))
      .transactional

  def createQuotation(creation: CodingDimensionCreation, position: BigDecimal) =
    quote(
      query[CodingDimension]
        .insert(lift(toCodingDimension(creation, position)))
        .returning(codingDimension => codingDimension))

  def maximumPositionQuotation(parentDimensionId: Option[UUID]) =
    quote(
      allForParentDimensionIdQuotation(parentDimensionId)
        .map(_.position)
        .max)

  def allForParentDimensionIdQuotation(parentDimensionId: Option[UUID]) =
    parentDimensionId match {
      case Some(dimensionId) =>
        quote(query[CodingDimension].filter(_.parentDimensionId.contains(lift(dimensionId))))
      case None =>
        quote(query[CodingDimension].filter(_.parentDimensionId.isEmpty))
    }

  def update(id: UUID, update: CodingDimensionUpdate): Future[CodingDimension] =
    run(updateCodingDimensionQuotation(id, update))
      .recover(defaultErrorHandler)

  def reposition(id: UUID, predecessorId: Option[UUID]): Future[CodingDimension] =
    if (predecessorId.contains(id))
      Future.failed(CustomError("id and predecessorId must not be equal"))
    else
      performIO(repositionAction(id, predecessorId).transactional)
        .recover(defaultErrorHandler)

  private def repositionAction(id: UUID, predecessorId: Option[UUID]) =
    for {
      codingDimension <- findCodingDimensionAction(id).flatMap(liftIOOrFail(EntityNotFound))
      position <- calculatePositionAction(predecessorId, codingDimension.parentDimensionId)
      updatedCodingDimension <- updatePositionAction(id, position)
    } yield updatedCodingDimension

  private def calculatePositionAction(predecessorId: Option[UUID], parentDimensionId: Option[UUID]) =
    predecessorId match {
      case Some(predId) =>
        val predecessorAction = runIO(
          query[CodingDimension]
            .filter(_.id == lift(predId))
            .take(1)
            .map(_.position))

        predecessorAction.flatMap {
          case Seq(predecessorPosition) =>
            runIO(
              allForParentDimensionIdQuotation(parentDimensionId)
                .filter(_.position > lift(predecessorPosition))
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
            IO.failed(CustomError(s"Couldn't find predecessor $predecessorId dimension in coding model"))
        }

      case _ =>
        runIO(
          quote(
            allForParentDimensionIdQuotation(parentDimensionId)
              .sortBy(_.position)
              .take(1)
              .map(_.position)))
          .flatMap {
            case Seq(position) => IO.successful(position / 2)
            case _ => IO.failed(CustomError(s"Couldn't find any dimension"))
          }
    }

  private def updatePositionAction(id: UUID, position: BigDecimal) =
    runIO(
      findCodingDimensionQuotation(id)
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.position -> lift(position)
        )
        .returning(codingDimension => codingDimension))

  def delete(id: UUID): Future[UUID] =
    run(deleteCodingDimensionQuotation(id))
      .recover { case throwable =>
        throwable.getCause match {
          case exception: GenericDatabaseException if isForeignKeyConstraintViolation(exception) =>
            throw EntityIsInUse
          case _ =>
            defaultErrorHandler(throwable)
        }
      }
}
