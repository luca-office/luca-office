package graphql.backoffice.mutations

import database.generated.public.ScenarioErpComponent
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ScenarioErpComponentCreation, ScenarioErpComponentUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpComponentMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createScenarioErpComponent(creation: ScenarioErpComponentCreation): Future[ScenarioErpComponent] =
    scenarioErpComponentService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateScenarioErpComponent(
      scenarioId: UUID,
      componentId: Int,
      update: ScenarioErpComponentUpdate): Future[ScenarioErpComponent] =
    scenarioErpComponentService.update(scenarioId, componentId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteScenarioErpComponent(scenarioId: UUID, componentId: Int): Future[ScenarioErpComponent] =
    scenarioErpComponentService.delete(scenarioId, componentId)
}
