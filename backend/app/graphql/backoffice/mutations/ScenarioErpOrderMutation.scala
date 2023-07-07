package graphql.backoffice.mutations

import database.generated.public.ScenarioErpOrder
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ScenarioErpOrderCreation, ScenarioErpOrderUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpOrderMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createScenarioErpOrder(creation: ScenarioErpOrderCreation): Future[ScenarioErpOrder] =
    scenarioErpOrderService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateScenarioErpOrder(scenarioId: UUID, orderId: Int, update: ScenarioErpOrderUpdate): Future[ScenarioErpOrder] =
    scenarioErpOrderService.update(scenarioId, orderId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteScenarioErpOrder(scenarioId: UUID, orderId: Int): Future[ScenarioErpOrder] =
    scenarioErpOrderService.delete(scenarioId, orderId)
}
