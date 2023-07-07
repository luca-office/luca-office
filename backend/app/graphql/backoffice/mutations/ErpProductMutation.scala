package graphql.backoffice.mutations

import database.generated.public.ErpProduct
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ErpProductCreation, ErpProductUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpProductMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createErpProduct(creation: ErpProductCreation): Future[ErpProduct] =
    erpProductService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateErpProduct(id: Int, sampleCompanyId: UUID, update: ErpProductUpdate): Future[ErpProduct] =
    erpProductService.update(id, sampleCompanyId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteErpProduct(id: Int, sampleCompanyId: UUID): Future[Int] =
    erpProductService.delete(id, sampleCompanyId)
}
