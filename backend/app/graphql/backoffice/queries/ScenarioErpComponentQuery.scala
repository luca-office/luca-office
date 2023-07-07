package graphql.backoffice.queries

import database.generated.public.ScenarioErpComponent
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpComponentQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioErpComponents(scenarioId: UUID): Future[Seq[ScenarioErpComponent]] =
    scenarioErpComponentService.all(scenarioId)
}
