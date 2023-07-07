package graphql.backoffice.queries

import database.generated.public.FreetextQuestionRating
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait FreetextQuestionRatingQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def freetextQuestionRatings(ratingId: UUID): Future[Seq[FreetextQuestionRating]] =
    freetextQuestionRatingService.all(ratingId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def freetextQuestionRating(id: UUID): Future[Option[FreetextQuestionRating]] =
    freetextQuestionRatingService.find(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def freetextQuestionRatingForParticipant(
      questionId: UUID,
      surveyInvitationId: UUID): Future[Option[FreetextQuestionRating]] =
    freetextQuestionRatingService.findForParticipant(questionId, surveyInvitationId)
}
