package graphql.backoffice.mutations

import database.generated.public.ScenarioErpProduct
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ScenarioErpProductCreation, ScenarioErpProductUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpProductMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createScenarioErpProduct(creation: ScenarioErpProductCreation): Future[ScenarioErpProduct] =
    scenarioErpProductService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateScenarioErpProduct(
      scenarioId: UUID,
      productId: Int,
      update: ScenarioErpProductUpdate): Future[ScenarioErpProduct] =
    scenarioErpProductService.update(scenarioId, productId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteScenarioErpProduct(scenarioId: UUID, productId: Int): Future[ScenarioErpProduct] =
    scenarioErpProductService.delete(scenarioId, productId)
}
