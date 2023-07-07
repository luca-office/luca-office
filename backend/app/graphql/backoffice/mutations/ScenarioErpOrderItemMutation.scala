package graphql.backoffice.mutations

import database.generated.public.ScenarioErpOrderItem
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ScenarioErpOrderItemCreation, ScenarioErpOrderItemUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpOrderItemMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createScenarioErpOrderItem(creation: ScenarioErpOrderItemCreation): Future[ScenarioErpOrderItem] =
    scenarioErpOrderItemService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateScenarioErpOrderItem(
      scenarioId: UUID,
      orderItemId: Int,
      update: ScenarioErpOrderItemUpdate): Future[ScenarioErpOrderItem] =
    scenarioErpOrderItemService.update(scenarioId, orderItemId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteScenarioErpOrderItem(scenarioId: UUID, orderItemId: Int): Future[ScenarioErpOrderItem] =
    scenarioErpOrderItemService.delete(scenarioId, orderItemId)
}
