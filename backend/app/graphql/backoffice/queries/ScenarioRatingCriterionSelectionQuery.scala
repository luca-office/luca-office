package graphql.backoffice.queries

import database.generated.public.ScenarioRatingCriterionSelection
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioRatingCriterionSelectionQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioRatingCriterionSelections(
      scenarioCodingItemRatingId: UUID): Future[Seq[ScenarioRatingCriterionSelection]] =
    scenarioRatingCriterionSelectionService.all(scenarioCodingItemRatingId)
}
