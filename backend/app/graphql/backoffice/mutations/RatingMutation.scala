package graphql.backoffice.mutations

import database.generated.public.Rating
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.RatingCreation
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait RatingMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createRating(creation: RatingCreation): Future[Rating] =
    runWithUserAccount(userAccount => ratingService.create(creation, userAccount.id))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def finalizeRating(id: UUID): Future[Rating] =
    runWithUserAccount(userAccount => ratingService.finalize(userAccount.id)(id))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteRating(id: UUID): Future[UUID] =
    ratingService.delete(id)
}
