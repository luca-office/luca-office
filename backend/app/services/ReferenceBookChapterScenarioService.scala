package services

import java.util.UUID

import database.DatabaseContext
import database.generated.public.ReferenceBookChapterScenario
import javax.inject.Inject
import models.ReferenceBookChapterScenarioId
import services.Utils.defaultErrorHandler
import services.generated._

import scala.concurrent.{ExecutionContext, Future}

class ReferenceBookChapterScenarioService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultReferenceBookChaptersForScenario
    with DefaultScenariosForReferenceBookChapter
    with DefaultDeleteReferenceBookChapterScenario {
  val context = databaseContext

  import context._

  def findQuotation(id: ReferenceBookChapterScenarioId) =
    quote(
      query[ReferenceBookChapterScenario]
        .filter(row =>
          row.scenarioId == lift(id.scenarioId) && row.referenceBookChapterId == lift(id.referenceBookChapterId)))

  def findAction(id: ReferenceBookChapterScenarioId) =
    runIO(findQuotation(id)).flatMap {
      case Nil => IO.failed(CustomError(s"Couldn't find reference book scenario $id"))
      case Seq(referenceBookChapterScenario) => IO.successful(referenceBookChapterScenario)
    }

  def create(creation: ReferenceBookChapterScenarioId): Future[ReferenceBookChapterScenario] =
    performIO(createAction(creation))
      .recover(defaultErrorHandler)

  def createAction(creation: ReferenceBookChapterScenarioId) =
    runIO(maximumPositionQuotation(creation.scenarioId))
      .flatMap(maximumPosition => runIO(createQuotation(creation, maximumPosition.map(_ + 1).getOrElse(1))))
      .transactional

  def createQuotation(creation: ReferenceBookChapterScenarioId, position: BigDecimal) =
    quote(
      query[ReferenceBookChapterScenario]
        .insert(lift(ReferenceBookChapterScenario(creation.referenceBookChapterId, creation.scenarioId, position)))
        .returning(referenceBookChapterScenario => referenceBookChapterScenario))

  def maximumPositionQuotation(scenarioId: UUID) =
    quote(
      query[ReferenceBookChapterScenario]
        .filter(_.scenarioId == lift(scenarioId))
        .map(_.position)
        .max)

  def reposition(
      id: ReferenceBookChapterScenarioId,
      predecessorId: Option[ReferenceBookChapterScenarioId]): Future[ReferenceBookChapterScenario] =
    if (predecessorId.contains(id))
      Future.failed(CustomError("id and predecessorId must not be equal"))
    else
      performIO(repositionAction(id, predecessorId).transactional)
        .recover(defaultErrorHandler)

  def repositionAction(id: ReferenceBookChapterScenarioId, predecessorId: Option[ReferenceBookChapterScenarioId]) =
    for {
      _ <- findAction(id)
      position <- calculatePositionAction(predecessorId, id.scenarioId)
      updatedReferenceBookChapterScenario <- updatePositionAction(id, position)
    } yield updatedReferenceBookChapterScenario

  def calculatePositionAction(predecessorId: Option[ReferenceBookChapterScenarioId], scenarioId: UUID) =
    predecessorId match {
      case Some(predId) =>
        val predecessorAction = runIO(
          query[ReferenceBookChapterScenario]
            .filter(row =>
              row.scenarioId == lift(predId.scenarioId) && row.referenceBookChapterId == lift(
                predId.referenceBookChapterId))
            .filter(_.scenarioId == lift(scenarioId))
            .take(1)
            .map(_.position))

        predecessorAction.flatMap {
          case Seq(predecessorPosition) =>
            runIO(
              query[ReferenceBookChapterScenario]
                .filter(_.position > lift(predecessorPosition))
                .filter(_.scenarioId == lift(scenarioId))
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
            IO.failed(CustomError(s"Couldn't find predecessor $predecessorId"))
        }

      case _ =>
        runIO(
          quote(
            query[ReferenceBookChapterScenario]
              .filter(_.scenarioId == lift(scenarioId))
              .sortBy(_.position)
              .take(1)
              .map(_.position)))
          .flatMap {
            case Seq(position) => IO.successful(position / 2)
            case _ => IO.failed(CustomError(s"Couldn't find any reference book scenario"))
          }
    }

  def updatePositionAction(id: ReferenceBookChapterScenarioId, position: BigDecimal) =
    runIO(
      quote(
        query[ReferenceBookChapterScenario]
          .filter(row =>
            row.scenarioId == lift(id.scenarioId) && row.referenceBookChapterId == lift(id.referenceBookChapterId))
          .update(_.position -> lift(position))
          .returning(referenceBookChapterScenario => referenceBookChapterScenario)))
}
