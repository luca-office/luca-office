package graphql.backoffice.queries

import database.generated.public.ScenarioErpOrderItem
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpOrderItemQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioErpOrderItems(scenarioId: UUID): Future[Seq[ScenarioErpOrderItem]] =
    scenarioErpOrderItemService.all(scenarioId)
}
