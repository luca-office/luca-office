package graphql.backoffice.mutations

import database.generated.public.ScenarioUserAccount
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioUserAccountMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createScenarioUserAccount(scenarioId: UUID, userAccountId: UUID): Future[ScenarioUserAccount] =
    scenarioUserAccountService.create(scenarioId, userAccountId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteScenarioUserAccount(scenarioId: UUID, userAccountId: UUID): Future[ScenarioUserAccount] =
    scenarioUserAccountService.delete(scenarioId, userAccountId)
}
