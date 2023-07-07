package graphql.backoffice.queries

import database.generated.public.ScenarioCodingItemRating
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioCodingItemRatingQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioCodingItemRatings(ratingId: UUID): Future[Seq[ScenarioCodingItemRating]] =
    scenarioCodingItemRatingService.all(ratingId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioCodingItemRating(id: UUID): Future[Option[ScenarioCodingItemRating]] =
    scenarioCodingItemRatingService.find(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioCodingItemRatingsForParticipant(
      scenarioId: UUID,
      surveyInvitationId: UUID): Future[Seq[ScenarioCodingItemRating]] =
    scenarioCodingItemRatingService.allForParticipant(scenarioId, surveyInvitationId)
}
