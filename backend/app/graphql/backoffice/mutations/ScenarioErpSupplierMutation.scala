package graphql.backoffice.mutations

import database.generated.public.ScenarioErpSupplier
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ScenarioErpSupplierCreation, ScenarioErpSupplierUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpSupplierMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createScenarioErpSupplier(creation: ScenarioErpSupplierCreation): Future[ScenarioErpSupplier] =
    scenarioErpSupplierService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateScenarioErpSupplier(
      scenarioId: UUID,
      supplierId: Int,
      update: ScenarioErpSupplierUpdate): Future[ScenarioErpSupplier] =
    scenarioErpSupplierService.update(scenarioId, supplierId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteScenarioErpSupplier(scenarioId: UUID, supplierId: Int): Future[ScenarioErpSupplier] =
    scenarioErpSupplierService.delete(scenarioId, supplierId)
}
