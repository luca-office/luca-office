package graphql.backoffice.mutations

import database.generated.public.ScenarioErpCustomer
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ScenarioErpCustomerCreation, ScenarioErpCustomerUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpCustomerMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createScenarioErpCustomer(creation: ScenarioErpCustomerCreation): Future[ScenarioErpCustomer] =
    scenarioErpCustomerService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateScenarioErpCustomer(
      scenarioId: UUID,
      customerId: Int,
      update: ScenarioErpCustomerUpdate): Future[ScenarioErpCustomer] =
    scenarioErpCustomerService.update(scenarioId, customerId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteScenarioErpCustomer(scenarioId: UUID, customerId: Int): Future[ScenarioErpCustomer] =
    scenarioErpCustomerService.delete(scenarioId, customerId)
}
