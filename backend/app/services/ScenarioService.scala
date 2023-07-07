package services

import database.DatabaseContext
import database.generated.public.{Scenario, ScenarioUserAccount, UserAccount}
import models.{ScenarioCreation, ScenarioUpdate}
import services.Utils.defaultErrorHandler
import services.actions._
import services.generated._
import utils.DateUtils

import java.time.Instant
import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends ScenarioServiceActions
    with DefaultUpdateScenario
    with DefaultDeleteScenario
    with CreateScenario
    with DuplicateScenario
    with DeleteBulkScenarioSampleCompanyFile
    with CreateMissingUserAccounts
    with CreateBulkScenarioUserAccount
    with QuillUtils {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all(userAccount: UserAccount): Future[Seq[Scenario]] =
    performIO(allScenariosAction(userAccount))

  def find(id: UUID, userAccountId: UUID): Future[Option[Scenario]] =
    performIO(findScenarioAction(id, userAccountId))

  def findWithoutUserAccount(id: UUID): Future[Option[Scenario]] =
    performIO(findScenarioWithoutUserAccountAction(id))

  def create(userAccountId: UUID)(creation: ScenarioCreation): Future[Scenario] =
    performIO(createScenarioAction(userAccountId)(creation))
      .recover(defaultErrorHandler)

  def update(id: UUID, update: ScenarioUpdate, userAccountId: UUID): Future[Scenario] = {
    val action = for {
      scenario <- findScenarioAction(id, userAccountId).flatMap(liftIOOrFail(EntityNotFound))
      updatedScenario <- updateScenarioAction(id, update)
      _ <-
        if (scenario.sampleCompanyId.isDefined && updatedScenario.sampleCompanyId.isEmpty)
          deleteBulkScenarioSampleCompanyFileAction(id)
        else
          IO.successful(())
    } yield updatedScenario

    performIO(action).recover(defaultErrorHandler)
  }

  def delete(id: UUID): Future[UUID] =
    performIO(deleteScenarioAction(id))

  def archive(id: UUID, userAccount: UserAccount): Future[Scenario] = {
    val action =
      findScenarioAction(id, userAccount.id).flatMap {
        case Some(scenario) =>
          if (!userAccount.mayArchive && !userAccount.isGlobalSuperAdmin && userAccount.id != scenario.authorId)
            IO.failed(InsufficientRights)
          else if (scenario.archivedAt.isDefined)
            IO.failed(EntityAlreadyArchived)
          else if (scenario.finalizedAt.isEmpty && scenario.publishedAt.isEmpty)
            IO.failed(EntityNotFinalizedAndNotPublished)
          else
            runIO(archiveQuotation(id, userAccount.id))
        case _ =>
          IO.failed(EntityNotFound)
      }

    performIO(action).recover(defaultErrorHandler)
  }

  private def archiveQuotation(id: UUID, userAccountId: UUID) = {
    val timestamp = DateUtils.now
    quote(
      findScenarioWithoutUserAccountQuotation(id)
        .update(
          _.modifiedAt -> lift(timestamp),
          _.archivedAt -> lift(Some(timestamp): Option[Instant])
        )
        .returning(scenario => scenario))
  }

  def finalize(id: UUID, userAccount: UserAccount): Future[Scenario] =
    performIO(finalizeAction(id, userAccount))
      .recover(defaultErrorHandler)

  private def finalizeAction(id: UUID, userAccount: UserAccount) =
    findScenarioAction(id, userAccount.id).flatMap {
      case Some(scenario) =>
        if (scenario.finalizedAt.isDefined)
          IO.failed(EntityAlreadyFinalized)
        else if (scenario.publishedAt.isEmpty && !(userAccount.mayFinalizeWithoutPublishing || userAccount.isGlobalSuperAdmin))
          IO.failed(EntityNotPublished)
        else if (!isFinalizationAllowed(scenario))
          IO.failed(CustomError(finalizationErrorMessage))
        else
          runIO(finalizeQuotation(id, userAccount.id))
      case _ =>
        IO.failed(EntityNotFound)
    }

  private def finalizeQuotation(id: UUID, userAccountId: UUID) =
    quote(
      findScenarioWithoutUserAccountQuotation(id)
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.finalizedAt -> lift(Some(DateUtils.now): Option[Instant])
        )
        .returning(scenario => scenario))

  def publish(id: UUID, userAccountId: UUID): Future[Scenario] =
    performIO(publishAction(id, userAccountId))
      .recover(defaultErrorHandler)

  private def publishAction(id: UUID, userAccountId: UUID) =
    findScenarioAction(id, userAccountId).flatMap {
      case Some(scenario) =>
        if (scenario.publishedAt.isDefined)
          IO.failed(EntityAlreadyPublished)
        else if (!isPublishingAllowed(scenario))
          IO.failed(CustomError(publishingErrorMessage))
        else
          runIO(publishQuotation(id, userAccountId))

      case _ =>
        IO.failed(EntityNotFound)
    }

  private def publishQuotation(id: UUID, userAccountId: UUID) =
    quote(
      findScenarioWithoutUserAccountQuotation(id)
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.publishedAt -> lift(Some(DateUtils.now): Option[Instant])
        )
        .returning(scenario => scenario))

  def duplicate(userAccountId: UUID)(id: UUID): Future[Scenario] =
    performIO(duplicateScenarioAction(userAccountId)(id).transactional).recover(defaultErrorHandler)

  def inviteContributors(scenarioId: UUID, emails: Seq[String]): Future[InviteContributorsResponse] =
    performIO(inviteContributorsAction(scenarioId, emails).transactional)
      .recover(defaultErrorHandler)

  private def inviteContributorsAction(scenarioId: UUID, emails: Seq[String]) =
    createMissingAccountsAction(emails).flatMap { userAccounts =>
      val scenarioUserAccountCreations =
        (userAccounts.existingAccounts ++ userAccounts.createdAccounts).map(account =>
          ScenarioUserAccount(scenarioId, account.id))
      createBulkScenarioUserAccountAction(scenarioUserAccountCreations)
        .map(_ =>
          InviteContributorsResponse(
            emailsWithAccount = userAccounts.existingAccounts.map(_.email),
            emailsWithoutAccount = userAccounts.createdAccounts.map(_.email)))
    }

  case class InviteContributorsResponse(emailsWithAccount: Seq[String], emailsWithoutAccount: Seq[String])

  private def isFinalizationAllowed(scenario: Scenario) =
    scenario.maxDurationInSeconds.exists(_ >= minimalMaxDurationInSeconds) &&
      Seq(scenario.maxDurationInSeconds, scenario.introductionEmailId, scenario.completionEmailAddress)
        .forall(_.isDefined)

  private val minimalMaxDurationInSeconds = 60

  private val finalizationErrorMessage =
    "At least one of the required properties maxDurationInSeconds, introductionEmailId, or completionEmailAddress" +
      s" is not defined or maxDurationInSeconds is less than $minimalMaxDurationInSeconds seconds"

  private def isPublishingAllowed(scenario: Scenario) = isFinalizationAllowed(scenario)

  private val publishingErrorMessage = finalizationErrorMessage
}

trait ScenarioServiceActions extends DefaultScenariosForUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def scenarioBaseQuotation(userAccountId: UUID) =
    quote(
      query[Scenario]
        .filter(row => row.authorId == lift(userAccountId) || row.publishedAt.isDefined)
        .union(scenariosForUserAccountQuotation(userAccountId)))

  def allScenariosAction(userAccount: UserAccount): IO[Seq[Scenario], Effect.Read] =
    if (userAccount.isGlobalSuperAdmin)
      runIO(quote(query[Scenario]))
    else
      runIO(allScenariosQuotation(userAccount))

  def allScenariosQuotation(userAccount: UserAccount) =
    quote(scenarioBaseQuotation(userAccount.id).filter(_.archivedAt.isEmpty))

  def findScenarioAction(id: UUID, userAccountId: UUID): IO[Option[Scenario], Effect.Read] =
    runIO(findScenarioQuotation(id, userAccountId)).map(_.headOption)

  def findScenarioQuotation(id: UUID, userAccountId: UUID) =
    quote(scenarioBaseQuotation(userAccountId).filter(scenario => scenario.id == lift(id)))

  def findScenarioWithoutUserAccountAction(id: UUID): context.IO[Option[Scenario], Effect.Read] =
    runIO(findScenarioWithoutUserAccountQuotation(id)).map(_.headOption)

  def findScenarioWithoutUserAccountQuotation(id: UUID) =
    quote(query[Scenario].filter(row => row.id == lift(id)))
}
