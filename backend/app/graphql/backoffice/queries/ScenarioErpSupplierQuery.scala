package graphql.backoffice.queries

import database.generated.public.ScenarioErpSupplier
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpSupplierQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioErpSuppliers(scenarioId: UUID): Future[Seq[ScenarioErpSupplier]] =
    scenarioErpSupplierService.all(scenarioId)
}
