package graphql.backoffice.mutations

import graphql.Private
import graphql.backoffice.BackofficeContext
import models._
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioCodingAutomatedCriterionMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createDocumentViewScenarioCodingAutomatedCriterion(
      creation: DocumentViewScenarioCodingAutomatedCriterionCreation): Future[ScenarioCodingAutomatedCriterionBase] =
    scenarioCodingAutomatedCriterionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createFeatureUsageScenarioCodingAutomatedCriterion(
      creation: FeatureUsageScenarioCodingAutomatedCriterionCreation): Future[ScenarioCodingAutomatedCriterionBase] =
    scenarioCodingAutomatedCriterionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createInputValueScenarioCodingAutomatedCriterion(
      creation: InputValueScenarioCodingAutomatedCriterionCreation): Future[ScenarioCodingAutomatedCriterionBase] =
    scenarioCodingAutomatedCriterionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createRScriptScenarioCodingAutomatedCriterion(
      creation: RScriptScenarioCodingAutomatedCriterionCreation): Future[ScenarioCodingAutomatedCriterionBase] =
    scenarioCodingAutomatedCriterionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createToolUsageScenarioCodingAutomatedCriterion(
      creation: ToolUsageScenarioCodingAutomatedCriterionCreation): Future[ScenarioCodingAutomatedCriterionBase] =
    scenarioCodingAutomatedCriterionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateDocumentViewScenarioCodingAutomatedCriterion(
      id: UUID,
      update: DocumentViewScenarioCodingAutomatedCriterionUpdate): Future[ScenarioCodingAutomatedCriterionBase] =
    scenarioCodingAutomatedCriterionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateFeatureUsageScenarioCodingAutomatedCriterion(
      id: UUID,
      update: FeatureUsageScenarioCodingAutomatedCriterionUpdate): Future[ScenarioCodingAutomatedCriterionBase] =
    scenarioCodingAutomatedCriterionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateInputValueScenarioCodingAutomatedCriterion(
      id: UUID,
      update: InputValueScenarioCodingAutomatedCriterionUpdate): Future[ScenarioCodingAutomatedCriterionBase] =
    scenarioCodingAutomatedCriterionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateRScriptScenarioCodingAutomatedCriterion(
      id: UUID,
      update: RScriptScenarioCodingAutomatedCriterionUpdate): Future[ScenarioCodingAutomatedCriterionBase] =
    scenarioCodingAutomatedCriterionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateToolUsageScenarioCodingAutomatedCriterion(
      id: UUID,
      update: ToolUsageScenarioCodingAutomatedCriterionUpdate): Future[ScenarioCodingAutomatedCriterionBase] =
    scenarioCodingAutomatedCriterionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteScenarioCodingAutomatedCriterion(id: UUID): Future[UUID] =
    scenarioCodingAutomatedCriterionService.delete(id)
}
