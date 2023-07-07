package services

import database.DatabaseContext
import database.generated.public.QuestionnaireAnswer
import models.{QuestionnaireAnswerCreation, QuestionnaireAnswerUpdate}
import services.Utils.defaultErrorHandler
import services.actions.CreateQuestionnaireAnswer
import services.generated._
import utils.DateUtils

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class QuestionnaireAnswerService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllQuestionnaireAnswer
    with DefaultFindQuestionnaireAnswer
    with DefaultUpdateQuestionnaireAnswer
    with DefaultDeleteQuestionnaireAnswer
    with CreateQuestionnaireAnswer
    with QuillUtils {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all(questionId: UUID): Future[Seq[QuestionnaireAnswer]] =
    run(allQuestionnaireAnswerQuotation(questionId))

  def find(id: UUID): Future[Option[QuestionnaireAnswer]] =
    performIO(findAction(id))

  def create(creation: QuestionnaireAnswerCreation): Future[QuestionnaireAnswer] =
    performIO(createQuestionnaireAnswerAction(creation))
      .recover(defaultErrorHandler)

  def update(id: UUID, update: QuestionnaireAnswerUpdate): Future[QuestionnaireAnswer] =
    run(updateQuotation(id, update))
      .recover(defaultErrorHandler)

  def reposition(id: UUID, predecessorId: Option[UUID]): Future[QuestionnaireAnswer] =
    if (predecessorId.contains(id))
      Future.failed(CustomError("id and predecessorId must not be equal"))
    else
      performIO(repositionAction(id, predecessorId).transactional)
        .recover(defaultErrorHandler)

  private def repositionAction(id: UUID, predecessorId: Option[UUID]) =
    for {
      questionnaireAnswer <- findAction(id).flatMap(liftIOOrFail(EntityNotFound))
      position <- calculatePositionAction(predecessorId, questionnaireAnswer.questionId)
      updatedQuestionnaireAnswer <- updatePositionAction(id, position)
    } yield updatedQuestionnaireAnswer

  private def calculatePositionAction(predecessorId: Option[UUID], questionId: UUID) =
    predecessorId match {
      case Some(predId) =>
        val predecessorAction = runIO(
          query[QuestionnaireAnswer]
            .filter(_.id == lift(predId))
            .filter(_.questionId == lift(questionId))
            .take(1)
            .map(_.position))

        predecessorAction.flatMap {
          case Seq(predecessorPosition) =>
            runIO(
              query[QuestionnaireAnswer]
                .filter(_.position > lift(predecessorPosition))
                .filter(_.questionId == lift(questionId))
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
            IO.failed(CustomError(s"Couldn't find predecessor $predecessorId answer in question"))
        }

      case _ =>
        runIO(
          quote(
            query[QuestionnaireAnswer]
              .filter(_.questionId == lift(questionId))
              .sortBy(_.position)
              .take(1)
              .map(_.position)))
          .flatMap {
            case Seq(position) => IO.successful(position / 2)
            case _ => IO.failed(CustomError(s"Couldn't find any answer"))
          }
    }

  private def updatePositionAction(id: UUID, position: BigDecimal) =
    runIO(
      findQuotation(id)
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.position -> lift(position)
        )
        .returning(questionnaireAnswer => questionnaireAnswer))

  def delete(id: UUID): Future[UUID] =
    run(deleteQuotation(id))
}
