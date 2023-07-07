package services

import database.DatabaseContext
import database.generated.public._
import enums.SurveyEventType.{EndProject, EndSurveyCommand, StartProject, StartSurveyCommand}
import enums.SurveyParticipationStatus.{
  ParticipationFinished,
  ParticipationInProgress,
  ParticipationNotStarted,
  RatingFinalized
}
import enums.{SurveyEventType, SurveyExecutionType}
import models._
import services.Utils.defaultErrorHandler
import services.actions.{AllSurveyEvent, CreateBulkRating, CreateBulkSurveyUserAccount, CreateMissingUserAccounts}
import services.generated._
import utils.ApplicationConfiguration
import utils.DateUtils.{isBeforeNow, now}

import java.time.Instant
import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class SurveyService @Inject() (databaseContext: DatabaseContext, applicationConfiguration: ApplicationConfiguration)(
    implicit val executionContext: ExecutionContext)
    extends SurveyServiceActions
    with DefaultCreateSurvey
    with DefaultUpdateSurvey
    with DefaultDeleteSurvey
    with DefaultAllSurveyInvitation
    with CreateMissingUserAccounts
    with CreateBulkSurveyUserAccount
    with DefaultAllProjectModule
    with AllSurveyEvent
    with ProjectServiceActions
    with DefaultCreateRating
    with CreateBulkRating
    with RatingServiceActions
    with SurveyEventServiceActions
    with SurveyInvitationServiceActions
    with QuillUtils {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all(projectId: UUID, userAccount: UserAccount): Future[Seq[Survey]] =
    performIO(allSurveysAction(projectId, userAccount))

  def allWithoutUserAccount(projectId: UUID): Future[Seq[Survey]] =
    performIO(allSurveysWithoutUserAccountAction(projectId))

  def find(id: UUID, userAccount: UserAccount): Future[Option[Survey]] =
    performIO(findSurveyAction(id, userAccount))

  def findWithoutUserAccount(id: UUID): Future[Option[Survey]] =
    performIO(findSurveyWithoutUserAccountAction(id))

  def create(creation: SurveyCreation): Future[Survey] = {
    val arePrivateProjectModulesPresent = for {
      projectModules <- allProjectModulesAction(creation.projectId)
      scenarioIds = projectModules.collect { case pm if pm.scenarioId.isDefined => pm.scenarioId.get }
      questionnaireIds = projectModules.collect { case pm if pm.questionnaireId.isDefined => pm.questionnaireId.get }
      privateScenarios <- runIO(query[Scenario].filter(scenario =>
        liftQuery(scenarioIds).contains(scenario.id) && scenario.finalizedAt.isEmpty && scenario.publishedAt.isEmpty))
      privateQuestionnaires <- runIO(
        query[Questionnaire].filter(questionnaire =>
          liftQuery(questionnaireIds).contains(questionnaire.id)
            && questionnaire.finalizedAt.isEmpty && questionnaire.publishedAt.isEmpty))
    } yield privateScenarios.nonEmpty || privateQuestionnaires.nonEmpty

    val createAction = for {
      survey <- createSurveyAction(creation)
      project <- findProjectWithoutUserAccountAction(creation.projectId).flatMap(liftIOOrFail(EntityNotFound))
      _ <- createRatingAction(RatingCreation(survey.id, isFinalScore = true), project.authorId)
    } yield survey

    val action =
      if (creation.isTestSurvey)
        createAction
      else
        arePrivateProjectModulesPresent.flatMap {
          case true =>
            IO.failed(ProjectHasPrivateModules)
          case false =>
            createAction
        }

    performIO(action.transactional).recover(defaultErrorHandler)
  }

  def update(id: UUID, update: SurveyUpdate): Future[Survey] =
    performIO(updateSurveyAction(id, update))
      .recover(defaultErrorHandler)

  def delete(id: UUID, userAccount: UserAccount): Future[UUID] = {
    val action = findSurveyAction(id, userAccount).flatMap {
      case None =>
        IO.failed(EntityNotFound)
      case Some(survey) =>
        if (survey.isTestSurvey)
          runIO(query[SurveyEvent].filter(_.surveyId == lift(id)).delete).flatMap(_ => deleteSurveyAction(id))
        else if (survey.startsAt.exists(_.isBefore(now)))
          deleteSurveyAction(id)
        else
          IO.failed(SurveyAlreadyStarted)
    }

    performIO(action).recover(defaultErrorHandler)
  }

  def invitationsCount(surveyId: UUID): Future[Long] =
    run(allSurveyInvitationsQuotation(surveyId).size)

  def isCompleted(endsAt: Option[Instant]): Boolean =
    endsAt.exists(isBeforeNow)

  def isRatingFinalized(surveyId: UUID): Future[Boolean] =
    performIO(findFinalScoreRatingAction(surveyId).map(_.exists(_.finalizedAt.isDefined)))

  def inProgressParticipationsCount(surveyId: UUID): Future[Long] =
    run(inProgressParticipationsCountQuotation(surveyId))
      .map(startAndEndEvents =>
        startAndEndEvents
          .groupBy(_.invitationId)
          .count { case (_, events) => events.length == 1 })

  private def inProgressParticipationsCountQuotation(surveyId: UUID) =
    quote(
      query[SurveyEvent]
        .filter(event =>
          event.surveyId == lift(surveyId)
            && (event.eventType == lift(StartProject: SurveyEventType)
              || event.eventType == lift(EndProject: SurveyEventType))))

  def completedParticipationsCount(surveyId: UUID): Future[Long] =
    run(completedParticipationsCountQuotation(surveyId))

  private def completedParticipationsCountQuotation(surveyId: UUID) =
    quote(
      query[SurveyEvent]
        .filter(_.surveyId == lift(surveyId))
        .filter(_.eventType == lift(EndProject: SurveyEventType))
        .size)

  def inviteRaters(surveyId: UUID, emails: Seq[String]): Future[InviteRatersResponse] =
    performIO(inviteRatersAction(surveyId, emails).transactional)
      .recover(defaultErrorHandler)

  private def inviteRatersAction(surveyId: UUID, emails: Seq[String]) =
    createMissingAccountsAction(emails).flatMap { userAccounts =>
      val allUserAccounts = userAccounts.existingAccounts ++ userAccounts.createdAccounts
      val surveyUserAccountCreations = allUserAccounts.map(account => SurveyUserAccount(surveyId, account.id))
      val emailsWithAccount = userAccounts.existingAccounts.map(_.email)
      val emailsWithoutAccount = userAccounts.createdAccounts.map(_.email)
      val response = InviteRatersResponse(emailsWithAccount, emailsWithoutAccount)
      val ratingCreationPairs = allUserAccounts
        .map(userAccount => (RatingCreation(surveyId, isFinalScore = false), userAccount.id))

      for {
        _ <- createBulkSurveyUserAccountAction(surveyUserAccountCreations)
        _ <- createBulkRatingAction(ratingCreationPairs)
      } yield response
    }

  case class InviteRatersResponse(emailsWithAccount: Seq[String], emailsWithoutAccount: Seq[String])

  def projectModuleProgresses(id: UUID): Future[Seq[ProjectModuleProgress]] = {
    val action = for {
      survey <- findSurveyWithoutUserAccountAction(id).flatMap(liftIOOrFail(EntityNotFound))
      projectModules <- allProjectModulesAction(survey.projectId)
      surveyEvents <- runIO(projectModuleStartAndEndEventsQuotation(survey.id))
    } yield (projectModules, surveyEvents)

    performIO(action).map { case (projectModules, surveyEvents) =>
      val decodedSurveyEventPairs = surveyEvents
        .collect { case event @ SurveyEvent(_, eventType, Some(data), _, _, _) =>
          (event.invitationId, SurveyEventService.decodeData(data, eventType))
        }
        .collect { case (invitationId, Right(eventData)) => (invitationId, eventData) }
      val scenarioEventsPerScenarioPerParticipant = decodedSurveyEventPairs
        .collect { case (invitationId, eventData: HasScenarioId) => (invitationId, eventData) }
        .groupBy { case (_, eventData) => eventData.scenarioId }
        .view
        .mapValues(_.groupBy { case (invitationId, _) => invitationId })
      val questionnaireEventsPerQuestionnairePerParticipant = decodedSurveyEventPairs
        .collect { case (invitationId, eventData: HasQuestionnaireId) => (invitationId, eventData) }
        .groupBy { case (_, eventData) => eventData.questionnaireId }
        .view
        .mapValues(_.groupBy { case (invitationId, _) => invitationId })

      val scenarioProgresses = projectModules
        .filter(_.scenarioId.isDefined)
        .map { projectModule =>
          val scenarioEventsPerParticipant =
            scenarioEventsPerScenarioPerParticipant.getOrElse(projectModule.scenarioId.get, Nil)
          val inProgressParticipationsCount = scenarioEventsPerParticipant
            .count { case (_, events) => events.length == 1 }
          val completedParticipationsCount = scenarioEventsPerParticipant
            .count { case (_, events) => events.length == 2 }

          ProjectModuleProgress(
            projectModuleId = projectModule.id,
            inProgressParticipationsCount = inProgressParticipationsCount,
            completedParticipationsCount = completedParticipationsCount
          )
        }

      val questionnaireProgresses = projectModules
        .filter(_.questionnaireId.isDefined)
        .map { projectModule =>
          val questionnaireEventsPerParticipant =
            questionnaireEventsPerQuestionnairePerParticipant.getOrElse(projectModule.questionnaireId.get, Nil)
          val inProgressParticipationsCount = questionnaireEventsPerParticipant
            .count { case (_, events) => events.length == 1 }
          val completedParticipationsCount = questionnaireEventsPerParticipant
            .count { case (_, events) => events.length == 2 }

          ProjectModuleProgress(
            projectModuleId = projectModule.id,
            inProgressParticipationsCount = inProgressParticipationsCount,
            completedParticipationsCount = completedParticipationsCount
          )
        }

      scenarioProgresses ++ questionnaireProgresses
    }
  }

  def openParticipationPlayerUrl(id: UUID) = s"${applicationConfiguration.misc.playerBaseUrl}#/survey/$id"

  def manualPeriod(surveyId: UUID): Future[Option[Period]] = {
    val action = for {
      manualSurvey <- findSurveyWithoutUserAccountAction(surveyId).map(
        _.filter(survey =>
          survey.executionType == SurveyExecutionType.ManualSynchronous
            || survey.executionType == SurveyExecutionType.ManualAsynchronous))
      surveyEvents <- runIO(
        allSurveyEventsForSurveyQuotation(surveyId)
          .filter(event =>
            event.eventType == lift(StartSurveyCommand: SurveyEventType)
              || event.eventType == lift(EndSurveyCommand: SurveyEventType)))
    } yield manualSurvey.map { _ =>
      Period(
        start = surveyEvents.find(_.eventType == StartSurveyCommand).map(_.timestamp),
        end = surveyEvents.find(_.eventType == EndSurveyCommand).map(_.timestamp)
      )
    }

    performIO(action)
  }

  def findParticipationInfo(token: String): Future[Option[SurveyParticipationInfo]] = {
    val action = findSurveyInvitationForTokenAction(token).flatMap {
      case Some(surveyInvitation) =>
        for {
          events <- runIO(surveyStartAndEndEventsQuotation(surveyInvitation.id))
          rating <- findFinalScoreRatingAction(surveyInvitation.surveyId).flatMap(liftIOOrFail(EntityNotFound))
        } yield {
          val eventTypes = events.map(_.eventType)
          val hasStartEvent = eventTypes.contains(StartProject)
          val hasEndEvent = eventTypes.contains(EndProject)
          val isRatingFinalized = rating.finalizedAt.isDefined
          val status =
            if (isRatingFinalized) RatingFinalized
            else if (hasEndEvent) ParticipationFinished
            else if (hasStartEvent) ParticipationInProgress
            else ParticipationNotStarted

          Some(SurveyParticipationInfo(surveyInvitation, status))
        }
      case _ =>
        IO.successful(None)
    }

    performIO(action)
  }
}

trait SurveyServiceActions extends ProjectServiceActions {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allSurveysAction(projectId: UUID, userAccount: UserAccount): IO[Seq[Survey], Effect.Read] =
    runIO(allSurveysQuotation(projectId, userAccount))

  def allSurveysQuotation(projectId: UUID, userAccount: UserAccount) =
    quote(for {
      visibleProject <- findProjectQuotation(projectId, userAccount)
      survey <- query[Survey].filter(_.projectId == visibleProject.id)
    } yield survey)

  def findSurveyAction(id: UUID, userAccount: UserAccount): IO[Option[Survey], Effect.Read] =
    runIO(findSurveyQuotation(id, userAccount)).map(_.headOption)

  def findSurveyQuotation(id: UUID, userAccount: UserAccount) = {
    val surveys = quote(query[Survey].filter(survey =>
      survey.id == lift(id) && allProjectsQuotation(userAccount).filter(_.id == survey.projectId).nonEmpty))
    quote(surveys.union(surveyForUserAccountQuotation(userAccount.id).filter(_.id == lift(id))))
  }

  def findSurveyWithoutUserAccountAction(id: UUID): IO[Option[Survey], Effect.Read] =
    runIO(findSurveyWithoutUserAccountQuotation(id)).map(_.headOption)

  def findSurveyWithoutUserAccountQuotation(id: UUID) =
    quote(query[Survey].filter(_.id == lift(id)))

  def allSurveysWithoutUserAccountAction(projectId: UUID): IO[Seq[Survey], Effect.Read] =
    runIO(allSurveysWithoutUserAccountQuotation(projectId))

  def allSurveysWithoutUserAccountQuotation(projectId: UUID) =
    quote(query[Survey].filter(_.projectId == lift(projectId)))

  def surveyForUserAccountQuotation(userAccountId: UUID) =
    quote(for {
      surveyUserAccount <- query[SurveyUserAccount].filter(_.userAccountId == lift(userAccountId))
      survey <- query[Survey].filter(_.id == surveyUserAccount.surveyId)
    } yield survey)
}
