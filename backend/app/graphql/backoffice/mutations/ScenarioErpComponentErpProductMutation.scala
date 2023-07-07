package graphql.backoffice.mutations

import database.generated.public.ScenarioErpComponentErpProduct
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ScenarioErpComponentErpProductCreation, ScenarioErpComponentErpProductUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpComponentErpProductMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createScenarioErpComponentErpProduct(
      creation: ScenarioErpComponentErpProductCreation): Future[ScenarioErpComponentErpProduct] =
    scenarioErpComponentErpProductService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateScenarioErpComponentErpProduct(
      scenarioId: UUID,
      componentProductId: Int,
      update: ScenarioErpComponentErpProductUpdate): Future[ScenarioErpComponentErpProduct] =
    scenarioErpComponentErpProductService.update(scenarioId, componentProductId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteScenarioErpComponentErpProduct(
      scenarioId: UUID,
      componentProductId: Int): Future[ScenarioErpComponentErpProduct] =
    scenarioErpComponentErpProductService.delete(scenarioId, componentProductId)
}
