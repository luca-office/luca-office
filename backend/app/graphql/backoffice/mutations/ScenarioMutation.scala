package graphql.backoffice.mutations

import database.generated.public.Scenario
import graphql.Private
import graphql.backoffice.BackofficeContext
import mails.ScenarioInvitationEmail
import models.{ScenarioCreation, ScenarioUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createScenario(creation: ScenarioCreation): Future[Scenario] =
    runWithUserAccount(userAccount => scenarioService.create(userAccount.id)(creation))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateScenario(id: UUID, update: ScenarioUpdate): Future[Scenario] =
    runWithUserAccount(userAccount => scenarioService.update(id, update, userAccount.id))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteScenario(id: UUID): Future[UUID] =
    scenarioService.delete(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def finalizeScenario(id: UUID): Future[Scenario] =
    runWithUserAccount(userAccount => scenarioService.finalize(id, userAccount))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def publishScenario(id: UUID): Future[Scenario] =
    runWithUserAccount(userAccount => scenarioService.publish(id, userAccount.id))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def archiveScenario(id: UUID): Future[Scenario] =
    runWithUserAccount(userAccount => scenarioService.archive(id, userAccount))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def duplicateScenario(id: UUID): Future[Scenario] =
    runWithUserAccount(userAccount => scenarioService.duplicate(userAccount.id)(id))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def inviteScenarioContributors(scenarioId: UUID, emails: Seq[String]): Future[Unit] = {
    val response = scenarioService.inviteContributors(scenarioId, emails)

    response.foreach { emails =>
      emails.emailsWithoutAccount.foreach(requestResetPasswordEmailHelper(_, isNewAccount = true))

      (emails.emailsWithoutAccount ++ emails.emailsWithAccount).foreach(email =>
        mailing.send(ScenarioInvitationEmail(applicationConfiguration, email, scenarioId)))
    }

    response.map(_ => ())
  }
}
