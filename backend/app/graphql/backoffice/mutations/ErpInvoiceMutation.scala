package graphql.backoffice.mutations

import database.generated.public.ErpInvoice
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ErpInvoiceCreation, ErpInvoiceUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpInvoiceMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createErpInvoice(creation: ErpInvoiceCreation): Future[ErpInvoice] =
    erpInvoiceService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateErpInvoice(id: Int, sampleCompanyId: UUID, update: ErpInvoiceUpdate): Future[ErpInvoice] =
    erpInvoiceService.update(id, sampleCompanyId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteErpInvoice(id: Int, sampleCompanyId: UUID): Future[Int] =
    erpInvoiceService.delete(id, sampleCompanyId)
}
