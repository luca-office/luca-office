package services

import database.DatabaseContext
import database.generated.public.{ProjectModule, Survey}
import enums.SurveyEventType
import io.getquill.Ord
import models.{ProjectModuleCreation, ProjectModuleStart, StartQuestionnaireCommand, StartScenarioCommand}
import services.SurveyEventService.toDecodedSurveyEvent
import services.Utils.defaultErrorHandler
import services.actions.AllSurveyEvent
import services.converters.ProjectModuleConverter.toProjectModule
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ProjectModuleService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllProjectModule
    with DefaultDeleteProjectModule
    with SurveyServiceActions
    with QuestionnaireServiceActions
    with ScenarioServiceActions
    with DefaultFindSurveyInvitation
    with AllSurveyEvent {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all(projectId: UUID): Future[Seq[ProjectModule]] =
    performIO(allProjectModulesAction(projectId))

  private def findAction(id: UUID) =
    runIO(findQuotation(id)).flatMap {
      case Nil => IO.failed(CustomError(s"Couldn't find project module $id"))
      case Seq(projectModule) => IO.successful(projectModule)
    }

  private def findQuotation(id: UUID) =
    quote(query[ProjectModule].filter(_.id == lift(id)))

  def create(creation: ProjectModuleCreation): Future[ProjectModule] = {
    val checkModuleAndCreateAction = for {
      isScenarioPrivate <- creation.scenarioId
        .map(isScenarioPrivateAction)
        .getOrElse(IO.successful(false))
      isQuestionnairePrivate <- creation.questionnaireId
        .map(isQuestionnairePrivateAction)
        .getOrElse(IO.successful(false))
      projectModule <-
        if (isScenarioPrivate || isQuestionnairePrivate) IO.failed(ProjectAlreadyHasSurveys)
        else createAction(creation)
    } yield projectModule

    val hasProjectNonTestSurveysAction =
      runIO(allSurveysWithoutUserAccountQuotation(creation.projectId).filter(!_.isTestSurvey).nonEmpty)

    val action = hasProjectNonTestSurveysAction.flatMap(hasProjectNonTestSurveys =>
      if (hasProjectNonTestSurveys) checkModuleAndCreateAction
      else createAction(creation))

    performIO(action).recover(defaultErrorHandler)
  }

  private def isScenarioPrivateAction(scenarioId: UUID) =
    runIO(
      findScenarioWithoutUserAccountQuotation(scenarioId)
        .filter(scenario => scenario.finalizedAt.isEmpty && scenario.publishedAt.isEmpty)
        .nonEmpty)

  private def isQuestionnairePrivateAction(questionnaireId: UUID) =
    runIO(
      findQuestionnaireWithoutUserAccountQuotation(questionnaireId)
        .filter(scenario => scenario.finalizedAt.isEmpty && scenario.publishedAt.isEmpty)
        .nonEmpty)

  private def createAction(creation: ProjectModuleCreation) =
    runIO(maximumPositionQuotation(creation.projectId))
      .flatMap(maximumPosition => runIO(createQuotation(creation, maximumPosition.map(_ + 1).getOrElse(1))))
      .transactional

  private def createQuotation(creation: ProjectModuleCreation, position: BigDecimal) =
    quote(
      query[ProjectModule]
        .insert(lift(toProjectModule(creation, position)))
        .returning(projectModule => projectModule))

  private def maximumPositionQuotation(projectId: UUID) =
    quote(
      query[ProjectModule]
        .filter(_.projectId == lift(projectId))
        .map(_.position)
        .max)

  def reposition(id: UUID, predecessorId: Option[UUID]): Future[ProjectModule] =
    if (predecessorId.contains(id))
      Future.failed(CustomError("id and predecessorId must not be equal"))
    else
      performIO(repositionAction(id, predecessorId).transactional)
        .recover(defaultErrorHandler)

  private def repositionAction(id: UUID, predecessorId: Option[UUID]) =
    for {
      projectModule <- findAction(id)
      position <- calculatePositionAction(predecessorId, projectModule.projectId)
      updatedProjectModule <- updatePositionAction(id, position)
    } yield updatedProjectModule

  private def calculatePositionAction(predecessorId: Option[UUID], projectId: UUID) =
    predecessorId match {
      case Some(predId) =>
        val predecessorAction = runIO(
          query[ProjectModule]
            .filter(_.id == lift(predId))
            .take(1)
            .map(_.position))

        predecessorAction.flatMap {
          case Seq(predecessorPosition) =>
            runIO(
              query[ProjectModule]
                .filter(_.position > lift(predecessorPosition))
                .filter(_.projectId == lift(projectId))
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
            query[ProjectModule]
              .filter(_.projectId == lift(projectId))
              .sortBy(_.position)
              .take(1)
              .map(_.position)))
          .flatMap {
            case Seq(position) => IO.successful(position / 2)
            case _ => IO.failed(CustomError(s"Couldn't find any project module"))
          }
    }

  private def updatePositionAction(id: UUID, position: BigDecimal) =
    runIO(
      quote(
        query[ProjectModule]
          .filter(_.id == lift(id))
          .update(_.position -> lift(position))
          .returning(projectModule => projectModule)))

  def delete(id: UUID): Future[ProjectModule] =
    performIO(deleteProjectModuleAction(id))

  def latestStartedProjectModule(surveyId: UUID): Future[Option[ProjectModuleStart]] = {
    val surveyEventAction = runIO(
      for {
        surveyEvent <- allSurveyEventsForSurveyQuotation(surveyId)
          .filter(event =>
            event.eventType == lift(SurveyEventType.StartScenarioCommand: SurveyEventType)
              || event.eventType == lift(SurveyEventType.StartQuestionnaireCommand: SurveyEventType))
          .sortBy(_.index)(Ord.desc)
          .take(1)
      } yield surveyEvent
    )

    val action = surveyEventAction
      .map(_.headOption.flatMap(toDecodedSurveyEvent(_).toOption))
      .flatMap {
        case Some(event) =>
          (event.data match {
            case data: StartScenarioCommand =>
              runIO(
                findSurveyWithoutUserAccountQuotation(surveyId).flatMap(survey =>
                  query[ProjectModule]
                    .filter(projectModule =>
                      projectModule.projectId == survey.projectId
                        && projectModule.scenarioId.contains(lift(data.scenarioId)))
                    .map(_.id)))
            case data: StartQuestionnaireCommand =>
              runIO(
                findSurveyWithoutUserAccountQuotation(surveyId).flatMap(survey =>
                  query[ProjectModule]
                    .filter(projectModule =>
                      projectModule.projectId == survey.projectId
                        && projectModule.questionnaireId.contains(lift(data.questionnaireId)))
                    .map(_.id)))
            case _ =>
              IO.failed(new Throwable("Unexpected event data type"))
          })
            .map(_.headOption.map(projectModuleId => ProjectModuleStart(projectModuleId, event.timestamp)))
        case None =>
          IO.successful(None)
      }

    performIO(action)
  }
}

trait ProjectModuleServiceActions extends DefaultFindSurveyInvitation with SurveyServiceActions {
  val context: DatabaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allProjectModulesForSurveyAction(surveyId: UUID): IO[Seq[ProjectModule], Effect.Read] =
    runIO(for {
      survey <- findSurveyWithoutUserAccountQuotation(surveyId)
      projectModule <- query[ProjectModule].filter(_.projectId == survey.projectId)
    } yield projectModule)

  def allProjectModulesForSurveyInvitationAction(invitationId: UUID): IO[Seq[ProjectModule], Effect.Read] =
    runIO(for {
      invitation <- findSurveyInvitationQuotation(invitationId)
      survey <- query[Survey].filter(_.id == invitation.surveyId)
      projectModule <- query[ProjectModule].filter(_.projectId == survey.projectId)
    } yield projectModule)
}
