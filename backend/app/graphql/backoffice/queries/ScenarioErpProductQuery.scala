package graphql.backoffice.queries

import database.generated.public.ScenarioErpProduct
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpProductQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioErpProducts(scenarioId: UUID): Future[Seq[ScenarioErpProduct]] =
    scenarioErpProductService.all(scenarioId)
}
