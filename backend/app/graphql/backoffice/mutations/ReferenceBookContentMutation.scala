package graphql.backoffice.mutations

import database.generated.public.ReferenceBookContent
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ReferenceBookContentCreation, ReferenceBookContentUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ReferenceBookContentMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createReferenceBookContent(creation: ReferenceBookContentCreation): Future[ReferenceBookContent] =
    referenceBookContentService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateReferenceBookContent(id: UUID, update: ReferenceBookContentUpdate): Future[ReferenceBookContent] =
    referenceBookContentService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteReferenceBookContent(id: UUID): Future[UUID] =
    referenceBookContentService.delete(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def repositionReferenceBookContent(id: UUID, predecessorId: Option[UUID]): Future[ReferenceBookContent] =
    referenceBookContentService.reposition(id, predecessorId)
}
