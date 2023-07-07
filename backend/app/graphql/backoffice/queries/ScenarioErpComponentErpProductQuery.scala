package graphql.backoffice.queries

import database.generated.public.ScenarioErpComponentErpProduct
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpComponentErpProductQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioErpComponentErpProducts(scenarioId: UUID): Future[Seq[ScenarioErpComponentErpProduct]] =
    scenarioErpComponentErpProductService.all(scenarioId)
}
