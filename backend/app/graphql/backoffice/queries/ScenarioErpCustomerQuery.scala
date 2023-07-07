package graphql.backoffice.queries

import database.generated.public.ScenarioErpCustomer
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpCustomerQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioErpCustomers(scenarioId: UUID): Future[Seq[ScenarioErpCustomer]] =
    scenarioErpCustomerService.all(scenarioId)
}
