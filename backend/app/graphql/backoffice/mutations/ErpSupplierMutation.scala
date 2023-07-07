package graphql.backoffice.mutations

import database.generated.public.ErpSupplier
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ErpSupplierCreation, ErpSupplierUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpSupplierMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createErpSupplier(creation: ErpSupplierCreation): Future[ErpSupplier] =
    erpSupplierService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateErpSupplier(id: Int, sampleCompanyId: UUID, update: ErpSupplierUpdate): Future[ErpSupplier] =
    erpSupplierService.update(id, sampleCompanyId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteErpSupplier(id: Int, sampleCompanyId: UUID): Future[Int] =
    erpSupplierService.delete(id, sampleCompanyId)
}
