package graphql.backoffice.queries

import database.generated.public.ScenarioErpOrder
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpOrderQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioErpOrders(scenarioId: UUID): Future[Seq[ScenarioErpOrder]] =
    scenarioErpOrderService.all(scenarioId)
}
