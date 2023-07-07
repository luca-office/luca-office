package graphql.backoffice.mutations

import database.generated.public.ErpOrder
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ErpOrderCreation, ErpOrderUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpOrderMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createErpOrder(creation: ErpOrderCreation): Future[ErpOrder] =
    erpOrderService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateErpOrder(id: Int, sampleCompanyId: UUID, update: ErpOrderUpdate): Future[ErpOrder] =
    erpOrderService.update(id, sampleCompanyId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteErpOrder(id: Int, sampleCompanyId: UUID): Future[Int] =
    erpOrderService.delete(id, sampleCompanyId)
}
