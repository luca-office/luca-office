package graphql.backoffice.mutations

import database.generated.public.ReferenceBookArticle
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ReferenceBookArticleCreation, ReferenceBookArticleUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ReferenceBookArticleMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createReferenceBookArticle(creation: ReferenceBookArticleCreation): Future[ReferenceBookArticle] =
    referenceBookArticleService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateReferenceBookArticle(id: UUID, update: ReferenceBookArticleUpdate): Future[ReferenceBookArticle] =
    referenceBookArticleService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteReferenceBookArticle(id: UUID): Future[UUID] =
    referenceBookArticleService.delete(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def repositionReferenceBookArticle(id: UUID, predecessorId: Option[UUID]): Future[ReferenceBookArticle] =
    referenceBookArticleService.reposition(id, predecessorId)
}
