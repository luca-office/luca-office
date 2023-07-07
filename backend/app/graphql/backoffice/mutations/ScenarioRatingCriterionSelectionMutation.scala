package graphql.backoffice.mutations

import database.generated.public.ScenarioRatingCriterionSelection
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.ScenarioRatingCriterionSelectionCreation
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioRatingCriterionSelectionMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createScenarioRatingCriterionSelection(
      creation: ScenarioRatingCriterionSelectionCreation): Future[ScenarioRatingCriterionSelection] =
    scenarioRatingCriterionSelectionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteScenarioRatingCriterionSelection(
      scenarioCodingItemRatingId: UUID,
      manualCriterionId: Option[UUID],
      automatedCriterionId: Option[UUID]): Future[ScenarioRatingCriterionSelection] =
    scenarioRatingCriterionSelectionService.delete(scenarioCodingItemRatingId, manualCriterionId, automatedCriterionId)
}
