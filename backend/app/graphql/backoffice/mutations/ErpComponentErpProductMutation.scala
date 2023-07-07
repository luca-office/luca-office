package graphql.backoffice.mutations

import database.generated.public.ErpComponentErpProduct
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ErpComponentErpProductCreation, ErpComponentErpProductUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpComponentErpProductMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createErpComponentErpProduct(creation: ErpComponentErpProductCreation): Future[ErpComponentErpProduct] =
    erpComponentErpProductService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateErpComponentErpProduct(
      id: Int,
      sampleCompanyId: UUID,
      update: ErpComponentErpProductUpdate): Future[ErpComponentErpProduct] =
    erpComponentErpProductService.update(id, sampleCompanyId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteErpComponentErpProduct(id: Int, sampleCompanyId: UUID): Future[ErpComponentErpProduct] =
    erpComponentErpProductService.delete(id, sampleCompanyId)
}
