package graphql.backoffice.queries

import database.generated.public.ScenarioErpInvoice
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpInvoiceQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioErpInvoices(scenarioId: UUID): Future[Seq[ScenarioErpInvoice]] =
    scenarioErpInvoiceService.all(scenarioId)
}
