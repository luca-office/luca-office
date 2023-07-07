package graphql.backoffice.mutations

import database.generated.public.ScenarioErpInvoice
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ScenarioErpInvoiceCreation, ScenarioErpInvoiceUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpInvoiceMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createScenarioErpInvoice(creation: ScenarioErpInvoiceCreation): Future[ScenarioErpInvoice] =
    scenarioErpInvoiceService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateScenarioErpInvoice(
      scenarioId: UUID,
      invoiceId: Int,
      update: ScenarioErpInvoiceUpdate): Future[ScenarioErpInvoice] =
    scenarioErpInvoiceService.update(scenarioId, invoiceId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteScenarioErpInvoice(scenarioId: UUID, invoiceId: Int): Future[ScenarioErpInvoice] =
    scenarioErpInvoiceService.delete(scenarioId, invoiceId)
}
