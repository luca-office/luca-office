package graphql.backoffice.mutations

import graphql.Private
import graphql.backoffice.BackofficeContext
import models._
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait CodingItemMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createAutomatedCodingItem(creation: AutomatedCodingItemCreation): Future[CodingItemBase] =
    codingItemService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createManualCodingItem(creation: ManualCodingItemCreation): Future[CodingItemBase] =
    codingItemService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateAutomatedCodingItem(id: UUID, update: AutomatedCodingItemUpdate): Future[CodingItemBase] =
    codingItemService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateManualCodingItem(id: UUID, update: ManualCodingItemUpdate): Future[CodingItemBase] =
    codingItemService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteCodingItem(id: UUID): Future[UUID] =
    codingItemService.delete(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def repositionCodingItem(id: UUID, predecessorId: Option[UUID]): Future[CodingItemBase] =
    codingItemService.reposition(id, predecessorId)
}
