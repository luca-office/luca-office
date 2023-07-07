package graphql.backoffice.mutations

import database.generated.public.ErpOrderItem
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ErpOrderItemCreation, ErpOrderItemUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpOrderItemMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createErpOrderItem(creation: ErpOrderItemCreation): Future[ErpOrderItem] =
    erpOrderItemService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateErpOrderItem(id: Int, sampleCompanyId: UUID, update: ErpOrderItemUpdate): Future[ErpOrderItem] =
    erpOrderItemService.update(id, sampleCompanyId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteErpOrderItem(id: Int, sampleCompanyId: UUID): Future[Int] =
    erpOrderItemService.delete(id, sampleCompanyId)
}
