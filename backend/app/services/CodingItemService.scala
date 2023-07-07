package services

import com.github.jasync.sql.db.postgresql.exceptions.GenericDatabaseException
import database.DatabaseContext
import database.generated.public.{CodingDimension, CodingItem, CodingModel}
import enums.ScoringType.Analytical
import models._
import services.Utils.{defaultErrorHandler, isForeignKeyConstraintViolation}
import services.actions.AllSurveyEvent
import services.converters.CodingItemConverter.{toCodingItem, toCodingItemBase}
import services.generated._
import utils.DateUtils

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class CodingItemService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllCodingItem
    with DefaultFindCodingItem
    with DefaultUpdateCodingItem
    with DefaultDeleteCodingItem
    with DefaultAllCodingCriterion
    with DefaultAllScenarioCodingAutomatedCriterion
    with DefaultCreateCodingCriterion
    with AllSurveyEvent
    with FindRScriptEvaluationResult
    with QuillUtils {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all(dimensionId: UUID): Future[Seq[CodingItemBase]] =
    performIO(allCodingItemsAction(dimensionId).map(_.map(toCodingItemBase)))

  def find(id: UUID): Future[Option[CodingItemBase]] =
    performIO(findCodingItemAction(id).map(_.map(toCodingItemBase)))

  def create(creation: CodingItemCreationBase): Future[CodingItemBase] = {
    val action = for {
      codingItem <- createAction(creation)
      _ <- createCodingCriterionAction(CodingCriterionCreation("", 0, codingItem.id))
      _ <- createCodingCriterionAction(CodingCriterionCreation("", 0, codingItem.id))
    } yield codingItem

    performIO(action.map(toCodingItemBase)).recover(defaultErrorHandler)
  }

  private def createAction(creation: CodingItemCreationBase) =
    runIO(maximumPositionQuotation(creation.dimensionId))
      .flatMap(maximumPosition => runIO(createQuotation(creation, maximumPosition.map(_ + 1).getOrElse(1))))
      .transactional

  private def createQuotation(creation: CodingItemCreationBase, position: BigDecimal) =
    quote(
      query[CodingItem]
        .insert(lift(toCodingItem(creation, position)))
        .returning(codingItem => codingItem))

  private def maximumPositionQuotation(dimensionId: UUID) =
    quote(
      query[CodingItem]
        .filter(_.dimensionId == lift(dimensionId))
        .map(_.position)
        .max)

  def reposition(id: UUID, predecessorId: Option[UUID]): Future[CodingItemBase] =
    if (predecessorId.contains(id))
      Future.failed(CustomError("id and predecessorId must not be equal"))
    else
      performIO(repositionAction(id, predecessorId).transactional.map(toCodingItemBase))
        .recover(defaultErrorHandler)

  private def repositionAction(id: UUID, predecessorId: Option[UUID]) =
    for {
      codingItem <- findCodingItemAction(id).flatMap(liftIOOrFail(EntityNotFound))
      position <- calculatePositionAction(predecessorId, codingItem.dimensionId)
      updatedCodingItem <- updatePositionAction(id, position)
    } yield updatedCodingItem

  private def calculatePositionAction(predecessorId: Option[UUID], dimensionId: UUID) =
    predecessorId match {
      case Some(predId) =>
        val predecessorAction = runIO(
          query[CodingItem]
            .filter(_.id == lift(predId))
            .filter(_.dimensionId == lift(dimensionId))
            .take(1)
            .map(_.position))

        predecessorAction.flatMap {
          case Seq(predecessorPosition) =>
            runIO(
              query[CodingItem]
                .filter(_.position > lift(predecessorPosition))
                .filter(_.dimensionId == lift(dimensionId))
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
            IO.failed(CustomError(s"Couldn't find predecessor $predecessorId coding item in coding dimension"))
        }

      case _ =>
        runIO(
          quote(
            query[CodingItem]
              .filter(_.dimensionId == lift(dimensionId))
              .sortBy(_.position)
              .take(1)
              .map(_.position)))
          .flatMap {
            case Seq(position) => IO.successful(position / 2)
            case _ => IO.failed(CustomError(s"Couldn't find any coding item"))
          }
    }

  private def updatePositionAction(id: UUID, position: BigDecimal) =
    runIO(
      findCodingItemQuotation(id)
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.position -> lift(position)
        )
        .returning(codingItem => codingItem))

  def update(id: UUID, update: CodingItemUpdateBase): Future[CodingItemBase] =
    performIO(updateCodingItemAction(id, update).map(toCodingItemBase))
      .recover(defaultErrorHandler)

  def delete(id: UUID): Future[UUID] =
    performIO(deleteCodingItemAction(id))
      .recover { case throwable =>
        throwable.getCause match {
          case exception: GenericDatabaseException if isForeignKeyConstraintViolation(exception) =>
            throw EntityIsInUse
          case _ =>
            defaultErrorHandler(throwable)
        }
      }

  def criteriaCount(item: CodingItemBase): Future[Long] =
    item match {
      case _: AutomatedCodingItem =>
        run(allScenarioCodingAutomatedCriteriaQuotation(item.id).size)
      case _: ManualCodingItem =>
        run(allCodingCriteriaQuotation(item.id).size)
    }

  def calculateMaximumScore(item: CodingItemBase): Future[Int] =
    (item match {
      case _: AutomatedCodingItem =>
        run(allScenarioCodingAutomatedCriteriaQuotation(item.id).map(_.score))
      case _: ManualCodingItem =>
        run(allCodingCriteriaQuotation(item.id).map(_.score))
    })
      .map(scores => if (item.scoringType == Analytical) scores.sum else scores.maxOption.getOrElse(0))

  def evaluationResults(
      id: UUID,
      surveyInvitationId: UUID,
      scenarioId: UUID): Future[Seq[AutomatedCodingCriterionEvaluationResult]] = {
    val action = for {
      criteria <- allScenarioCodingAutomatedCriteriaAction(id)
      rScriptEvaluationResults <-
        IO.traverse(
          criteria
            .map(_.id)
        )(criterionId =>
          findRScriptEvaluationResultsForSurveyInvitationIdAndScenarioCodingAutomatedCriterion(
            surveyInvitationId = surveyInvitationId,
            criterionId = criterionId))
          .map(_.flatten)
      surveyEvents <- allSurveyEventsForParticipantForScenarioAction(surveyInvitationId, scenarioId)
    } yield (surveyEvents, rScriptEvaluationResults, criteria)

    performIO(action).map { case (surveyEvents, rScriptEvaluationResults, criteria) =>
      criteria.map(criterion =>
        AutomatedCodingCriterionEvaluationResult(
          criterion.id,
          AutomatedCodingEvaluation.evaluate(surveyEvents, rScriptEvaluationResults, criterion)))
    }
  }
}

trait CodingItemServiceActions {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allCodingItemsForScenarioQuotation(scenarioId: UUID) =
    quote(for {
      model <- query[CodingModel].filter(_.scenarioId == lift(scenarioId))
      dimension <- query[CodingDimension].filter(_.codingModelId == model.id)
      item <- query[CodingItem].filter(_.dimensionId == dimension.id)
    } yield item)
}

case class AutomatedCodingCriterionEvaluationResult(criterionId: UUID, isFulfilled: Boolean)
