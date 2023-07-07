package graphql.backoffice.queries

import database.generated.public.Scenario
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarios: Future[Seq[Scenario]] =
    runWithUserAccount(scenarioService.all)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenario(id: UUID): Future[Option[Scenario]] =
    runWithUserAccount(userAccount => scenarioService.find(id, userAccount.id))
}
