package services

import database.DatabaseContext
import database.generated.public._
import models.{ProjectCreation, ProjectUpdate}
import services.Utils.defaultErrorHandler
import services.actions.{CreateBulkProjectUserAccount, CreateBulkUserAccount, CreateMissingUserAccounts}
import services.converters.ProjectConverter.toProject
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ProjectService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends ProjectServiceActions
    with DefaultUpdateProject
    with DefaultDeleteProject
    with DefaultAllProjectModule
    with CreateBulkUserAccount
    with CreateMissingUserAccounts
    with CreateBulkProjectUserAccount
    with SurveyServiceActions {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all(userAccount: UserAccount): Future[Seq[Project]] =
    performIO(allProjectsAction(userAccount))

  def find(id: UUID, userAccount: UserAccount): Future[Option[Project]] =
    performIO(findProjectAction(id, userAccount))

  def findWithoutUserAccount(id: UUID): Future[Option[Project]] =
    performIO(findProjectWithoutUserAccountAction(id))

  def findForSurvey(userAccount: UserAccount, surveyId: UUID): Future[Option[Project]] =
    performIO(findProjectForSurveyAction(userAccount, surveyId))

  def create(userAccountId: UUID)(creation: ProjectCreation): Future[Project] =
    run(createQuotation(userAccountId)(creation))
      .recover(defaultErrorHandler)

  private def createQuotation(userAccountId: UUID)(creation: ProjectCreation) =
    quote(
      query[Project]
        .insert(lift(toProject(creation, userAccountId)))
        .returning(project => project))

  def update(id: UUID, update: ProjectUpdate): Future[Project] =
    performIO(updateProjectAction(id, update))
      .recover(defaultErrorHandler)

  def delete(id: UUID): Future[UUID] =
    performIO(deleteProjectAction(id))

  def calculateMaxDurationInSeconds(id: UUID): Future[Int] =
    performIO(for {
      scenarioDurationsSum <- runIO(
        scenariosForProjectQuotation(id)
          .map(_.maxDurationInSeconds.getOrElse(lift(scenarioFallbackDurationInSeconds)))
          .sum)
      questionnaireDurationsSum <- runIO(
        questionnairesForProjectQuotation(id)
          .map(_.maxDurationInSeconds.getOrElse(lift(questionnaireFallbackDurationInSeconds)))
          .sum)
    } yield scenarioDurationsSum.getOrElse(0) + questionnaireDurationsSum.getOrElse(0))

  private def scenariosForProjectQuotation(id: UUID) =
    quote(for {
      projectModuleScenarioId <- allProjectModulesQuotation(id).map(_.scenarioId)
      scenario <- query[Scenario].filter(scenario => projectModuleScenarioId.contains(scenario.id))
    } yield scenario)

  private def questionnairesForProjectQuotation(id: UUID) =
    quote(for {
      projectModuleQuestionnaireId <- allProjectModulesQuotation(id).map(_.questionnaireId)
      questionnaire <- query[Questionnaire].filter(questionnaire =>
        projectModuleQuestionnaireId.contains(questionnaire.id))
    } yield questionnaire)

  def isFinalized(projectId: UUID): Future[Boolean] =
    run(allSurveysWithoutUserAccountQuotation(projectId).filter(!_.isTestSurvey).nonEmpty)

  def inviteContributors(projectId: UUID, emails: Seq[String]): Future[InviteContributorsResponse] =
    performIO(inviteContributorsAction(projectId, emails).transactional)
      .recover(defaultErrorHandler)

  private def inviteContributorsAction(projectId: UUID, emails: Seq[String]) =
    createMissingAccountsAction(emails).flatMap { userAccounts =>
      val projectUserAccountCreations =
        (userAccounts.existingAccounts ++ userAccounts.createdAccounts).map(account =>
          ProjectUserAccount(projectId, account.id))
      createBulkProjectUserAccountAction(projectUserAccountCreations)
        .map(_ =>
          InviteContributorsResponse(
            emailsWithAccount = userAccounts.existingAccounts.map(_.email),
            emailsWithoutAccount = userAccounts.createdAccounts.map(_.email)))
    }

  case class InviteContributorsResponse(emailsWithAccount: Seq[String], emailsWithoutAccount: Seq[String])

  private val scenarioFallbackDurationInSeconds = 60 * 60

  private val questionnaireFallbackDurationInSeconds = scenarioFallbackDurationInSeconds
}

trait ProjectServiceActions extends DefaultProjectsForUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allProjectsAction(userAccount: UserAccount): context.IO[Seq[Project], Effect.Read] =
    runIO(allProjectsQuotation(userAccount))

  def allProjectsQuotation(userAccount: UserAccount) =
    if (userAccount.isGlobalSuperAdmin)
      quote(query[Project])
    else
      quote(
        query[Project]
          .filter(row => row.authorId == lift(userAccount.id))
          .union(projectsForUserAccountQuotation(userAccount.id))
      )

  def findProjectForSurveyAction(userAccount: UserAccount, surveyId: UUID): context.IO[Option[Project], Effect.Read] =
    runIO(findProjectForSurveyQuotation(userAccount, surveyId)).map(_.headOption)

  private def findProjectForSurveyQuotation(userAccount: UserAccount, surveyId: UUID) =
    quote {
      query[Survey]
        .filter(survey => survey.id == lift(surveyId))
        .join(query[Project])
        .on((survey, project) => survey.projectId == project.id)
        .leftJoin(query[SurveyUserAccount])
        .on { case ((survey, _), surveyUserAccount) => survey.id == surveyUserAccount.surveyId }
        .leftJoin(query[ProjectUserAccount])
        .on { case (((survey, _), _), projectUserAccount) =>
          survey.projectId == projectUserAccount.projectId
        }
        .filter { case (((_, project), surveyUserAccount), projectUserAccount) =>
          project.authorId == lift(userAccount.id) ||
            surveyUserAccount.exists(_.userAccountId == lift(userAccount.id)) ||
            projectUserAccount.exists(_.userAccountId == lift(userAccount.id))
        }
        .map { case (((_, project), _), _) => project }
    }

  def findProjectAction(id: UUID, userAccount: UserAccount): context.IO[Option[Project], Effect.Read] =
    runIO(findProjectQuotation(id, userAccount)).map(_.headOption)

  def findProjectQuotation(id: UUID, userAccount: UserAccount) =
    quote(allProjectsQuotation(userAccount).filter(project => project.id == lift(id)))

  def findProjectWithoutUserAccountAction(id: UUID): context.IO[Option[Project], Effect.Read] =
    runIO(findProjectWithoutUserAccountQuotation(id)).map(_.headOption)

  def findProjectWithoutUserAccountQuotation(id: UUID) =
    quote(query[Project].filter(_.id == lift(id)))
}
