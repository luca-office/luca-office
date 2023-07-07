package graphql.backoffice.queries

import database.generated.public.Rating
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait RatingQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def ratings(surveyId: UUID): Future[Seq[Rating]] =
    ratingService.all(surveyId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def rating(id: UUID): Future[Option[Rating]] =
    ratingService.find(id)
}
