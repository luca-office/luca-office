package graphql.backoffice.mutations

import database.generated.public.CodingDimension
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{CodingDimensionCreation, CodingDimensionUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait CodingDimensionMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createCodingDimension(creation: CodingDimensionCreation): Future[CodingDimension] =
    codingDimensionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateCodingDimension(id: UUID, update: CodingDimensionUpdate): Future[CodingDimension] =
    codingDimensionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteCodingDimension(id: UUID): Future[UUID] =
    codingDimensionService.delete(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def repositionCodingDimension(id: UUID, predecessorId: Option[UUID]): Future[CodingDimension] =
    codingDimensionService.reposition(id, predecessorId)
}
