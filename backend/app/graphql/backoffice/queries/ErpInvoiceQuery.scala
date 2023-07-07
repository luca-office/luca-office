package graphql.backoffice.queries

import database.generated.public.ErpInvoice
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpInvoiceQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpInvoices(sampleCompanyId: UUID): Future[Seq[ErpInvoice]] =
    erpInvoiceService.all(sampleCompanyId)
}
