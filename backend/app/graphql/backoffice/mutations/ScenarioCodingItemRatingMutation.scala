package graphql.backoffice.mutations

import database.generated.public.ScenarioCodingItemRating
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ScenarioCodingItemRatingCreation, ScenarioCodingItemRatingUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioCodingItemRatingMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createScenarioCodingItemRating(creation: ScenarioCodingItemRatingCreation): Future[ScenarioCodingItemRating] =
    scenarioCodingItemRatingService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateScenarioCodingItemRating(
      id: UUID,
      update: ScenarioCodingItemRatingUpdate): Future[ScenarioCodingItemRating] =
    scenarioCodingItemRatingService.update(id, update)
}
