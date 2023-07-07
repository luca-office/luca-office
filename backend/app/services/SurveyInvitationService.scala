package services

import database.DatabaseContext
import database.generated.public._
import enums.ProjectModuleProgressType.{Completed, InProgress}
import enums.SurveyEventType
import enums.SurveyExecutionType.AutomaticAsynchronous
import io.circe.generic.auto._
import models._
import services.Utils.defaultErrorHandler
import services.actions.{AllDirectory, AllSurveyEvent}
import services.converters.SurveyInvitationConverter.toSurveyInvitation
import services.generated._
import utils.{DateUtils, TokenUtils}

import java.time.Instant
import java.util.UUID
import javax.inject.Inject
import scala.annotation.nowarn
import scala.concurrent.{ExecutionContext, Future}

class SurveyInvitationService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllSurveyInvitation
    with DefaultFindSurveyInvitation
    with DefaultUpdateSurveyInvitation
    with DefaultDeleteSurveyInvitation
    with SurveyServiceActions
    with AllDirectory
    with SurveyInvitationServiceActions
    with UserAccountServiceActions
    with ScenarioDocumentsServiceActions
    with ProjectModuleServiceActions
    with QuillUtils {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all(surveyId: UUID): Future[Seq[SurveyInvitation]] =
    performIO(allSurveyInvitationsAction(surveyId))

  def find(id: UUID): Future[Option[SurveyInvitation]] =
    performIO(findSurveyInvitationAction(id))

  def find(token: String): Future[Option[SurveyInvitation]] = {
    val action = findSurveyInvitationForTokenWithPeriodCheckAction(token).flatMap {
      case Some(surveyInvitation) =>
        runIO(isStartProjectEventPresentQuotation(surveyInvitation.id))
          .flatMap(isStartProjectEventPresent =>
            if (isStartProjectEventPresent)
              IO.failed(TokenAlreadyUsed)
            else
              IO.successful(Some(surveyInvitation)))
      case _ =>
        IO.successful(None)
    }

    performIO(action)
  }

  def findForResumption(token: String): Future[Option[SurveyInvitation]] =
    performIO(findSurveyInvitationForTokenWithPeriodCheckAction(token))

  def createBulk(creations: Seq[SurveyInvitationCreation]): Future[Seq[SurveyInvitation]] = {
    val surveyInvitations = creations.map(toSurveyInvitation(_, TokenUtils.create))
    run(createBulkQuotation(surveyInvitations))
      .recover(defaultErrorHandler)
  }

  private def createBulkQuotation(surveyInvitations: Seq[SurveyInvitation]) =
    quote(liftQuery(surveyInvitations).foreach(createQuotation))

  private def createQuotation(surveyInvitation: SurveyInvitation) = {
    // Exclude index from insertion
    @nowarn
    implicit val surveyInvitationInsertMeta = insertMeta[SurveyInvitation](_.index)

    quote(
      query[SurveyInvitation]
        .insert(surveyInvitation)
        .returning(invitation => invitation))
  }

  def update(id: UUID, update: SurveyInvitationUpdate): Future[SurveyInvitation] =
    performIO(updateSurveyInvitationAction(id, update)).recover(defaultErrorHandler)

  def delete(id: UUID): Future[UUID] =
    performIO(deleteSurveyInvitationAction(id))

  def createForOpenParticipation(surveyId: UUID): Future[SurveyInvitation] = {
    // Exclude index from insertion
    @nowarn
    implicit val surveyInvitationInsertMeta = insertMeta[SurveyInvitation](_.index)

    val now = DateUtils.now
    val invitation = SurveyInvitation(
      id = UUID.randomUUID(),
      createdAt = now,
      modifiedAt = now,
      token = TokenUtils.create,
      email = None,
      surveyId = surveyId,
      userAccountId = None,
      index = -1,
      isOpenParticipation = true
    )

    val action = findSurveyWithoutUserAccountAction(surveyId).flatMap {
      case None =>
        IO.failed(EntityNotFound)
      case Some(survey) if !survey.isOpenParticipationEnabled =>
        IO.failed(OpenParticipationIsDisabled)
      case Some(survey) =>
        checkSurveyPeriodAction(survey, now)
          .flatMap(_ => runIO(query[SurveyInvitation].insert(lift(invitation)).returning(invitation => invitation)))
    }

    performIO(action)
  }

  def userAccountParticipation(invitationId: UUID, email: String, password: String): Future[SurveyInvitation] = {
    val action = for {
      userAccount <- authenticateUserAccountAction(email, password)
      surveyInvitation <- findSurveyInvitationAction(invitationId).flatMap(liftIOOrFail(EntityNotFound))
      _ <- runIO(
        allSurveyInvitationsQuotation(surveyInvitation.surveyId)
          .filter(_.userAccountId.contains(lift(userAccount.id)))
          .isEmpty)
        .flatMap {
          case true => IO.successful(())
          case false => IO.failed(UserAccountHasAlreadyParticipated)
        }
      updatedSurveyInvitation <- updateSurveyInvitationAction(
        invitationId,
        SurveyInvitationUpdate(Some(userAccount.id)))
    } yield updatedSurveyInvitation

    performIO(action)
  }

  def projectModuleProgresses(invitationId: UUID, surveyId: UUID): Future[Seq[ParticipantProjectModuleProgress]] = {
    val action =
      for {
        surveyEvents <- runIO(projectModuleProgressSurveyEventsQuotation(invitationId))
        projectModules <- allProjectModulesForSurveyAction(surveyId)
        surveyEventDataItems = createSurveyEventDataItems(surveyEvents, projectModules.map(_.questionnaireId))
        questionnaireProgresses = createParticipantQuestionnaireProgresses(surveyEventDataItems)
        scenarioEventDataItems = surveyEventDataItems.collect { case eventData: HasScenarioId => eventData }
        projectModulProgresses <- createParticipantScenarioProgressesAction(invitationId, scenarioEventDataItems)
          .map(scenarioProgresses => (scenarioProgresses ++ questionnaireProgresses).toSeq)
      } yield projectModulProgresses
    performIO(action)
  }

  private def createSurveyEventDataItems(surveyEvents: Seq[SurveyEvent], questionnaireIds: Seq[Option[UUID]]) =
    surveyEvents
      .collect { case SurveyEvent(_, eventType, Some(data), _, _, _) =>
        SurveyEventService.decodeData(data, eventType)
      }
      .collect { case Right(value) => value }
      .filter {
        case _: HasScenarioId => true
        case eventData: HasQuestionnaireId =>
          questionnaireIds.contains(Some(eventData.questionnaireId))
        case _ => false
      }

  private def createParticipantScenarioProgressesAction(
      invitationId: UUID,
      surveyEventDataItems: Seq[SurveyEventData with HasScenarioId]) =
    IO.sequence(
      surveyEventDataItems
        .groupBy(_.scenarioId)
        .map { case (scenarioId, eventDataItems) =>
          val isScenarioCompleted = eventDataItems.exists {
            case _: models.EndScenario => true
            case _ => false
          }

          openedRequiredDocumentsCountAction(invitationId, scenarioId)
            .map { case (openedRequiredDocumentsCount, requiredDocumentsCount) =>
              ParticipantProjectModuleProgress(
                scenarioId = Some(scenarioId),
                questionnaireId = None,
                status = if (isScenarioCompleted) Completed else InProgress,
                questionsInProgressCount = None,
                requiredDocumentsCount = Some(requiredDocumentsCount),
                openedRequiredDocumentsCount = Some(openedRequiredDocumentsCount)
              )
            }
        })

  private def createParticipantQuestionnaireProgresses(surveyEventDataItems: Seq[SurveyEventData]) =
    surveyEventDataItems
      .collect { case eventData: HasQuestionnaireId => eventData }
      .groupBy(_.questionnaireId)
      .map { case (questionnaireId, eventDataItems) =>
        val isQuestionnaireCompleted = eventDataItems.exists {
          case _: models.EndQuestionnaire => true
          case _ => false
        }
        val questionsInProgressCount = eventDataItems
          .collect {
            case eventData: models.SelectQuestionnaireAnswer => eventData
            case eventData: models.SelectQuestionnaireFreetextAnswer => eventData
            case eventData: models.UpdateQuestionnaireFreeTextAnswer => eventData
          }
          .map(_.questionId)
          .distinct
          .size
        ParticipantProjectModuleProgress(
          scenarioId = None,
          questionnaireId = Some(questionnaireId),
          status = if (isQuestionnaireCompleted) Completed else InProgress,
          questionsInProgressCount = Some(questionsInProgressCount),
          requiredDocumentsCount = None,
          openedRequiredDocumentsCount = None
        )
      }

  private def projectModuleProgressSurveyEventsQuotation(invitationId: UUID) =
    quote(
      query[SurveyEvent]
        .filter(surveyEvent =>
          surveyEvent.invitationId.contains(lift(invitationId))
            && (surveyEvent.eventType == lift(SurveyEventType.StartScenario: SurveyEventType)
              || surveyEvent.eventType == lift(SurveyEventType.EndScenario: SurveyEventType)
              || surveyEvent.eventType == lift(SurveyEventType.StartQuestionnaire: SurveyEventType)
              || surveyEvent.eventType == lift(SurveyEventType.EndQuestionnaire: SurveyEventType)
              || surveyEvent.eventType == lift(SurveyEventType.SelectQuestionnaireAnswer: SurveyEventType)
              || surveyEvent.eventType == lift(SurveyEventType.SelectQuestionnaireFreetextAnswer: SurveyEventType)
              || surveyEvent.eventType == lift(SurveyEventType.UpdateQuestionnaireFreeTextAnswer: SurveyEventType))))

  def participationData(invitationId: UUID): Future[Option[ParticipantData]] =
    run(participationDataQuotation(invitationId))
      .map(_.headOption)
      .map(_.flatMap(surveyEvent => surveyEvent.data.flatMap(_.as[models.ParticipantData].toOption)))

  private def participationDataQuotation(invitationId: UUID) =
    quote(
      query[SurveyEvent]
        .filter(surveyEvent =>
          surveyEvent.invitationId.contains(lift(invitationId))
            && surveyEvent.eventType == lift(SurveyEventType.StoreParticipantData: SurveyEventType))
    )

  private def isStartProjectEventPresentQuotation(invitationId: UUID) =
    quote(
      query[SurveyEvent]
        .filter(event =>
          event.invitationId.contains(lift(invitationId))
            && event.eventType == lift(SurveyEventType.StartProject: SurveyEventType))
        .nonEmpty)
}

trait SurveyInvitationServiceActions extends SurveyServiceActions with AllSurveyEvent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findSurveyInvitationForTokenWithPeriodCheckAction(token: String): IO[Option[SurveyInvitation], Effect.Read] =
    findSurveyInvitationForTokenAction(token).flatMap {
      case Some(surveyInvitation) =>
        findSurveyWithoutUserAccountAction(surveyInvitation.surveyId)
          .flatMap {
            case Some(survey) =>
              checkSurveyPeriodAction(survey, DateUtils.now).map(_ => Some(surveyInvitation))
            case _ =>
              IO.failed(EntityNotFound)
          }
      case _ =>
        IO.successful(None)
    }

  def findSurveyInvitationForTokenAction(token: String): IO[Option[SurveyInvitation], Effect.Read] =
    runIO(findSurveyInvitationForTokenQuotation(token)).map(_.headOption)

  def findSurveyInvitationForTokenQuotation(token: String) =
    quote(query[SurveyInvitation].filter(_.token == lift(token)))

  def checkSurveyPeriodAction(survey: Survey, now: Instant): IO[Unit, Effect.Read] =
    if (survey.executionType == AutomaticAsynchronous)
      (survey.startsAt, survey.endsAt) match {
        case (None, _) | (_, None) =>
          IO.failed(CustomError("startsAt and endsAt may not be empty"))
        case (Some(startsAt), _) if startsAt.isAfter(now) =>
          IO.failed(SurveyNotStartedYet)
        case (_, Some(endsAt)) if endsAt.isBefore(now) =>
          IO.failed(SurveyAlreadyEnded)
        case _ =>
          IO.successful(())
      }
    else
      runIO(
        allSurveyEventsForSurveyQuotation(survey.id)
          .filter(_.eventType == lift(SurveyEventType.EndSurveyCommand: SurveyEventType))
          .nonEmpty)
        .flatMap(isEndSurveyCommandPresent =>
          if (isEndSurveyCommandPresent) IO.failed(SurveyAlreadyEnded) else IO.successful(()))
}
