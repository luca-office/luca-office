package graphql.backoffice.mutations

import database.generated.public.FreetextQuestionRating
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{FreetextQuestionRatingCreation, FreetextQuestionRatingUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait FreetextQuestionRatingMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createFreetextQuestionRating(creation: FreetextQuestionRatingCreation): Future[FreetextQuestionRating] =
    freetextQuestionRatingService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateFreetextQuestionRating(id: UUID, update: FreetextQuestionRatingUpdate): Future[FreetextQuestionRating] =
    freetextQuestionRatingService.update(id, update)
}
