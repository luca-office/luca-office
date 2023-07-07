package services

import database.DatabaseContext
import database.generated.public.{Questionnaire, UserAccount}
import enums.QuestionnaireType
import models.{QuestionnaireCreation, QuestionnaireUpdate}
import services.Utils.defaultErrorHandler
import services.actions.DuplicateQuestionnaire
import services.generated._
import utils.DateUtils

import java.time.Instant
import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class QuestionnaireService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends QuestionnaireServiceActions
    with DefaultCreateQuestionnaire
    with DefaultUpdateQuestionnaire
    with DefaultDeleteQuestionnaire
    with DuplicateQuestionnaire
    with DefaultAllQuestionnaireQuestion {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all(userAccount: UserAccount)(questionnaireType: QuestionnaireType): Future[Seq[Questionnaire]] =
    performIO(allQuestionnairesAction(userAccount)(questionnaireType))

  def find(id: UUID, userAccount: UserAccount): Future[Option[Questionnaire]] =
    performIO(findQuestionnaireAction(id, userAccount))

  def findWithoutUserAccount(id: UUID): Future[Option[Questionnaire]] =
    performIO(findQuestionnaireWithoutUserAccountAction(id))

  def create(creation: QuestionnaireCreation, authorId: UUID): Future[Questionnaire] =
    performIO(createQuestionnaireAction(creation, authorId))
      .recover(defaultErrorHandler)

  def update(id: UUID, update: QuestionnaireUpdate): Future[Questionnaire] =
    performIO(updateQuestionnaireAction(id, update))
      .recover(defaultErrorHandler)

  def delete(id: UUID): Future[UUID] =
    performIO(deleteQuestionnaireAction(id))

  def duplicate(id: UUID, userAccount: UserAccount): Future[Questionnaire] =
    performIO(duplicateQuestionnaireAction(id, userAccount))
      .recover(defaultErrorHandler)

  def archive(id: UUID, userAccount: UserAccount): Future[Questionnaire] = {
    val action =
      findQuestionnaireAction(id, userAccount).flatMap {
        case Some(questionnaire) =>
          if (!userAccount.mayArchive && !userAccount.isGlobalSuperAdmin && userAccount.id != questionnaire.authorId)
            IO.failed(InsufficientRights)
          if (questionnaire.archivedAt.isDefined)
            IO.failed(EntityAlreadyArchived)
          else if (questionnaire.finalizedAt.isEmpty && questionnaire.publishedAt.isEmpty)
            IO.failed(EntityNotFinalizedAndNotPublished)
          else
            runIO(archiveQuotation(id, userAccount))
        case _ =>
          IO.failed(EntityNotFound)
      }

    performIO(action).recover(defaultErrorHandler)
  }

  private def archiveQuotation(id: UUID, userAccount: UserAccount) = {
    val timestamp = DateUtils.now
    quote(
      findQuestionnaireQuotation(id, userAccount)
        .update(
          _.modifiedAt -> lift(timestamp),
          _.archivedAt -> lift(Some(timestamp): Option[Instant])
        )
        .returning(questionnaire => questionnaire))
  }

  def finalize(id: UUID, userAccount: UserAccount): Future[Questionnaire] =
    performIO(finalizeAction(id, userAccount))
      .recover(defaultErrorHandler)

  private def finalizeAction(id: UUID, userAccount: UserAccount) =
    findQuestionnaireAction(id, userAccount).flatMap {
      case Some(questionnaire) =>
        if (questionnaire.finalizedAt.isDefined)
          IO.failed(EntityAlreadyFinalized)
        else if (questionnaire.publishedAt.isEmpty && !(userAccount.mayFinalizeWithoutPublishing || userAccount.isGlobalSuperAdmin))
          IO.failed(EntityNotPublished)
        else if (!isFinalizationAllowed(questionnaire))
          IO.failed(CustomError(finalizationErrorMessage))
        else
          runIO(finalizeQuotation(id, userAccount))
      case _ =>
        IO.failed(EntityNotFound)
    }

  private def finalizeQuotation(id: UUID, userAccount: UserAccount) =
    quote(
      findQuestionnaireQuotation(id, userAccount)
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.finalizedAt -> lift(Some(DateUtils.now): Option[Instant])
        )
        .returning(questionnaire => questionnaire))

  def publish(id: UUID, userAccount: UserAccount): Future[Questionnaire] =
    performIO(publishAction(id, userAccount))
      .recover(defaultErrorHandler)

  private def publishAction(id: UUID, userAccount: UserAccount) =
    findQuestionnaireAction(id, userAccount).flatMap {
      case Some(questionnaire) =>
        if (questionnaire.publishedAt.isDefined)
          IO.failed(EntityAlreadyPublished)
        else if (!isPublishingAllowed(questionnaire))
          IO.failed(CustomError(publishingErrorMessage))
        else
          runIO(publishQuotation(id, userAccount))
      case _ =>
        IO.failed(EntityNotFound)
    }

  private def publishQuotation(id: UUID, userAccount: UserAccount) =
    quote(
      findQuestionnaireQuotation(id, userAccount)
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.publishedAt -> lift(Some(DateUtils.now): Option[Instant])
        )
        .returning(questionnaire => questionnaire))

  def questionsCount(id: UUID): Future[Long] =
    run(allQuestionnaireQuestionsQuotation(id).size)

  private def isFinalizationAllowed(questionnaire: Questionnaire) =
    questionnaire.questionnaireType == QuestionnaireType.RuntimeSurvey ||
      questionnaire.maxDurationInSeconds.exists(_ >= minimalMaxDurationInSeconds)

  private val minimalMaxDurationInSeconds = 60

  private val finalizationErrorMessage =
    s"maxDurationInSeconds is not defined or maxDurationInSeconds is less than $minimalMaxDurationInSeconds seconds"

  private def isPublishingAllowed(questionnaire: Questionnaire) = isFinalizationAllowed(questionnaire)

  private val publishingErrorMessage = finalizationErrorMessage
}

trait QuestionnaireServiceActions {

  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def questionnaireBaseQuotation(userAccount: UserAccount) =
    if (userAccount.isGlobalSuperAdmin)
      quote(query[Questionnaire].filter(row => row.archivedAt.isEmpty))
    else
      quote(
        query[Questionnaire]
          .filter(row => row.archivedAt.isEmpty && (row.authorId == lift(userAccount.id) || row.publishedAt.isDefined)))

  def allQuestionnairesAction(userAccount: UserAccount)(
      questionnaireType: QuestionnaireType): context.IO[Seq[Questionnaire], Effect.Read] =
    runIO(allQuestionnairesQuotation(userAccount)(questionnaireType))

  def allQuestionnairesQuotation(userAccount: UserAccount)(questionnaireType: QuestionnaireType) = {
    val baseQuotation =
      if (userAccount.isGlobalSuperAdmin)
        quote(
          query[Questionnaire]
            .filter(row => row.archivedAt.isEmpty)
        )
      else questionnaireBaseQuotation(userAccount)

    quote(
      baseQuotation
        .filter(_.questionnaireType == lift(questionnaireType)))
  }

  def findQuestionnaireAction(id: UUID, userAccount: UserAccount): context.IO[Option[Questionnaire], Effect.Read] =
    runIO(findQuestionnaireQuotation(id, userAccount)).map(_.headOption)

  def findQuestionnaireQuotation(id: UUID, userAccount: UserAccount) =
    quote(questionnaireBaseQuotation(userAccount).filter(_.id == lift(id)))

  def findQuestionnaireWithoutUserAccountAction(id: UUID): context.IO[Option[Questionnaire], Effect.Read] =
    runIO(findQuestionnaireWithoutUserAccountQuotation(id)).map(_.headOption)

  def findQuestionnaireWithoutUserAccountQuotation(id: UUID) =
    quote(query[Questionnaire].filter(_.id == lift(id)))
}
