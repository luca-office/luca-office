package services

import database.DatabaseContext
import database.generated.public.{
  FreetextQuestionCodingCriterion,
  QuestionnaireAnswer,
  QuestionnaireQuestion,
  SurveyEvent
}
import enums.QuestionType.FreeText
import enums.{QuestionType, SurveyEventType}
import models._
import services.Utils.defaultErrorHandler
import services.actions.{
  AllSurveyEvent,
  CreateQuestionnaireAnswer,
  DeleteBulkFreetextQuestionCodingCriterion,
  DeleteBulkQuestionnaireAnswer
}
import services.converters.QuestionnaireQuestionConverter.toQuestionnaireQuestion
import services.generated._
import utils.DateUtils

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class QuestionnaireQuestionService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends QuestionnaireQuestionServiceActions
    with DefaultAllQuestionnaireQuestion
    with DefaultFindQuestionnaireQuestion
    with DefaultUpdateQuestionnaireQuestion
    with DefaultDeleteQuestionnaireQuestion
    with CreateQuestionnaireAnswer
    with DefaultCreateFreetextQuestionCodingCriterion
    with DeleteBulkQuestionnaireAnswer
    with DeleteBulkFreetextQuestionCodingCriterion
    with QuillUtils {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all(questionnaireId: UUID): Future[Seq[QuestionnaireQuestion]] =
    performIO(allQuestionnaireQuestionsAction(questionnaireId))

  def find(id: UUID): Future[Option[QuestionnaireQuestion]] =
    run(findQuestionnaireQuestionQuotation(id)).map(_.headOption)

  def create(creation: QuestionnaireQuestionCreation): Future[QuestionnaireQuestion] = {
    val action = for {
      question <- createAction(creation)
      _ <-
        if (question.questionType != FreeText) createDefaultAnswersAction(question.id)
        else createDefaultCriteriaAction(question.id)
    } yield question

    performIO(action).recover(defaultErrorHandler)
  }

  private def createAction(creation: QuestionnaireQuestionCreation) =
    runIO(maximumPositionQuotation(creation.questionnaireId))
      .flatMap(maximumPosition => runIO(createQuotation(creation, maximumPosition.map(_ + 1).getOrElse(1))))
      .transactional

  private def createQuotation(creation: QuestionnaireQuestionCreation, position: BigDecimal) =
    quote(
      query[QuestionnaireQuestion]
        .insert(lift(toQuestionnaireQuestion(creation, position)))
        .returning(questionnaireQuestion => questionnaireQuestion))

  private def maximumPositionQuotation(questionnaireId: UUID) =
    quote(
      query[QuestionnaireQuestion]
        .filter(_.questionnaireId == lift(questionnaireId))
        .map(_.position)
        .max)

  def reposition(id: UUID, predecessorId: Option[UUID]): Future[QuestionnaireQuestion] =
    if (predecessorId.contains(id))
      Future.failed(CustomError("id and predecessorId must not be equal"))
    else
      performIO(repositionAction(id, predecessorId).transactional)
        .recover(defaultErrorHandler)

  private def repositionAction(id: UUID, predecessorId: Option[UUID]) =
    for {
      questionnaireQuestion <- findQuestionnaireQuestionAction(id).flatMap(liftIOOrFail(EntityNotFound))
      position <- calculatePositionAction(predecessorId, questionnaireQuestion.questionnaireId)
      updatedQuestionnaireQuestion <- updatePositionAction(id, position)
    } yield updatedQuestionnaireQuestion

  private def calculatePositionAction(predecessorId: Option[UUID], questionnaireId: UUID) =
    predecessorId match {
      case Some(predId) =>
        val predecessorAction = runIO(
          query[QuestionnaireQuestion]
            .filter(_.id == lift(predId))
            .filter(_.questionnaireId == lift(questionnaireId))
            .take(1)
            .map(_.position))

        predecessorAction.flatMap {
          case Seq(predecessorPosition) =>
            runIO(
              query[QuestionnaireQuestion]
                .filter(_.position > lift(predecessorPosition))
                .filter(_.questionnaireId == lift(questionnaireId))
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
            IO.failed(CustomError(s"Couldn't find predecessor $predecessorId question in questionnaire"))
        }

      case _ =>
        runIO(
          quote(
            query[QuestionnaireQuestion]
              .filter(_.questionnaireId == lift(questionnaireId))
              .sortBy(_.position)
              .take(1)
              .map(_.position)))
          .flatMap {
            case Seq(position) => IO.successful(position / 2)
            case _ => IO.failed(CustomError(s"Couldn't find any question"))
          }
    }

  private def updatePositionAction(id: UUID, position: BigDecimal) =
    runIO(
      findQuestionnaireQuestionQuotation(id)
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.position -> lift(position)
        )
        .returning(questionnaireQuestion => questionnaireQuestion))

  def update(id: UUID, update: QuestionnaireQuestionUpdate): Future[QuestionnaireQuestion] = {
    val action = for {
      question <- findQuestionnaireQuestionAction(id).flatMap(liftIOOrFail(EntityNotFound))
      updatedQuestion <- updateQuestionnaireQuestionAction(id, update)
      _ <- (question.questionType, updatedQuestion.questionType) match {
        case (previousQuestionType, nextQuestionType) if previousQuestionType == nextQuestionType =>
          IO.successful(())
        case (_, FreeText) =>
          deleteBulkQuestionnaireAnswerAction(id).flatMap(_ => createDefaultCriteriaAction(id))
        case (FreeText, _) =>
          deleteBulkFreetextQuestionCodingCriterionAction(id).flatMap(_ => createDefaultAnswersAction(id))
        case _ =>
          IO.successful(())
      }
    } yield updatedQuestion

    performIO(action).recover(defaultErrorHandler)
  }

  private def createDefaultAnswersAction(questionId: UUID) = for {
    _ <- createQuestionnaireAnswerAction(QuestionnaireAnswerCreation("", isCorrect = false, questionId))
    _ <- createQuestionnaireAnswerAction(QuestionnaireAnswerCreation("", isCorrect = false, questionId))
  } yield ()

  private def createDefaultCriteriaAction(questionId: UUID) = for {
    _ <- createFreetextQuestionCodingCriterionAction(FreetextQuestionCodingCriterionCreation("", 0, questionId))
    _ <- createFreetextQuestionCodingCriterionAction(FreetextQuestionCodingCriterionCreation("", 1, questionId))
  } yield ()

  def delete(id: UUID): Future[UUID] =
    performIO(deleteQuestionnaireQuestionAction(id))

  def selectedAnswersForParticipant(questionId: UUID, surveyInvitationId: UUID): Future[QuestionAnswerSelection] =
    performIO(selectedAnswersForParticipantAction(questionId, surveyInvitationId))

  def freeTextAnswerForParticipant(questionId: UUID, surveyInvitationId: UUID): Future[Option[String]] =
    performIO(freeTextAnswerForParticipantAction(questionId, surveyInvitationId))
}

trait QuestionnaireQuestionServiceActions extends DefaultFindQuestionnaireQuestion with AllSurveyEvent with QuillUtils {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def selectedAnswersForParticipantAndQuestionAction(question: QuestionnaireQuestion, surveyInvitationId: UUID): IO[QuestionAnswerSelection, Effect.Read] =
    for {
      surveyEvents <- runIO(selectedAnswersForParticipantQuotation(surveyInvitationId))
    } yield selectedAnswersForParticipant(question, surveyEvents.sortBy(_.index))

  def selectedAnswersForParticipantAction(
      questionId: UUID,
      surveyInvitationId: UUID): IO[QuestionAnswerSelection, Effect.Read] =
    for {
      question <- findQuestionnaireQuestionAction(questionId).flatMap(liftIOOrFail(EntityNotFound))
      surveyEvents <- runIO(selectedAnswersForParticipantQuotation(surveyInvitationId))
    } yield selectedAnswersForParticipant(question, surveyEvents.sortBy(_.index))

  def selectedAnswersForParticipant(
      question: QuestionnaireQuestion,
      sortedSurveyEvents: Seq[SurveyEvent]): QuestionAnswerSelection = {
    val surveyEventDataItems = sortedSurveyEvents
      .collect { case SurveyEvent(_, eventType, Some(data), _, _, _) =>
        SurveyEventService.decodeData(data, eventType)
      }
      .collect { case Right(value: HasQuestionId) if value.questionId == question.id => value }

    question.questionType match {
      case QuestionType.MultipleChoice =>
        val selectedAnswerIds = surveyEventDataItems
          .collect { case value: HasAnswerId => value }
          .groupBy(_.answerId)
          .filter { case (_, eventDataItems) =>
            eventDataItems.lastOption match {
              case Some(_: SelectQuestionnaireAnswer) => true
              case _ => false
            }
          }
          .keys
          .toSeq
        val wasFreetextAnswerSelected = surveyEventDataItems.filter {
          case _: SelectQuestionnaireFreetextAnswer | _: DeselectQuestionnaireFreetextAnswer => true
          case _ => false
        }.lastOption match {
          case Some(_: SelectQuestionnaireFreetextAnswer) => true
          case _ => false
        }
        QuestionAnswerSelection(selectedAnswerIds, wasFreetextAnswerSelected)

      case QuestionType.SingleChoice =>
        surveyEventDataItems.lastOption match {
          case Some(event: SelectQuestionnaireAnswer) =>
            QuestionAnswerSelection(Seq(event.answerId), wasFreetextAnswerSelected = false)
          case Some(_: SelectQuestionnaireFreetextAnswer) =>
            QuestionAnswerSelection(Nil, wasFreetextAnswerSelected = true)
          case _ =>
            QuestionAnswerSelection(Nil, wasFreetextAnswerSelected = false)
        }

      case _ =>
        QuestionAnswerSelection(Nil, wasFreetextAnswerSelected = false)
    }
  }

  def selectedAnswersForParticipantQuotation(surveyInvitationId: UUID) =
    quote(
      allSurveyEventsForParticipantQuotation(surveyInvitationId)
        .filter(surveyEvent =>
          liftQuery(selectedAnswersForParticipantSurveyEventTypes).contains(surveyEvent.eventType)))

  def freeTextAnswerForParticipantAction(questionId: UUID, surveyInvitationId: UUID): IO[Option[String], Effect.Read] =
    runIO(freeTextAnswerForParticipantQuotation(surveyInvitationId))
      .map(surveyEvents =>
        surveyEvents
          .sortBy(_.index)(Ordering[Int].reverse)
          .collect { case SurveyEvent(_, eventType, Some(data), _, _, _) =>
            SurveyEventService.decodeData(data, eventType)
          }
          .collect { case Right(value: UpdateQuestionnaireFreeTextAnswer) if value.questionId == questionId => value }
          .find(_.questionId == questionId)
          .map(_.value))

  def freeTextAnswerForParticipantQuotation(surveyInvitationId: UUID) =
    quote(
      query[SurveyEvent]
        .filter(row =>
          row.invitationId.contains(lift(surveyInvitationId))
            && row.eventType == lift(SurveyEventType.UpdateQuestionnaireFreeTextAnswer: SurveyEventType)))

  def selectedAnswersForSurveyAction(surveyId: UUID): context.IO[Seq[SurveyEvent], Effect.Read] = runIO(
    selectedAnswersForSurveyQuotation(surveyId))

  def selectedAnswersForSurveyQuotation(surveyId: UUID) =
    quote(
      quote(
        query[SurveyEvent]
          .filter(surveyEvent =>
            surveyEvent.surveyId == lift(surveyId) && lift(selectedAnswersForParticipantSurveyEventTypes).contains(
              surveyEvent.eventType))
      ))

  def allAnswersForQuestionnaireAction(questionIds: Seq[UUID]): IO[Seq[QuestionnaireAnswer], Effect.Read] =
    runIO(allAnswersForQuestionnaireQuotation(questionIds))

  def allAnswersForQuestionnaireQuotation(questionIds: Seq[UUID]) =
    quote(query[QuestionnaireAnswer].filter(answer => liftQuery(questionIds).contains(answer.questionId)))

  def allFreetextQuestionnaireCodingCriteriaAction(
      questionIds: Seq[UUID]): context.IO[Seq[FreetextQuestionCodingCriterion], Effect.Read] =
    runIO(allFreetextQuestionnaireCodingCriteriaQuotation(questionIds))

  def allFreetextQuestionnaireCodingCriteriaQuotation(questionIds: Seq[UUID]) =
    quote(
      query[FreetextQuestionCodingCriterion].filter(criterion => liftQuery(questionIds).contains(criterion.questionId)))

  val selectedAnswersForParticipantSurveyEventTypes: Seq[SurveyEventType] = Seq(
    SurveyEventType.SelectQuestionnaireAnswer,
    SurveyEventType.DeselectQuestionnaireAnswer,
    SurveyEventType.SelectQuestionnaireFreetextAnswer,
    SurveyEventType.DeselectQuestionnaireFreetextAnswer
  )
}
