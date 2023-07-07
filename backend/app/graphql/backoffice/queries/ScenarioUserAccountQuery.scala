package graphql.backoffice.queries

import database.generated.public.{Scenario, UserAccount}
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioUserAccountQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def userAccountsForScenario(scenarioId: UUID): Future[Seq[UserAccount]] =
    scenarioUserAccountService.userAccountsForScenario(scenarioId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenariosForUserAccount(userAccountId: UUID): Future[Seq[Scenario]] =
    scenarioUserAccountService.scenariosForUserAccount(userAccountId)
}
