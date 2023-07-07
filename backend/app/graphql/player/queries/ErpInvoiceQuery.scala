package graphql.player.queries

import database.generated.public.ErpInvoice
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpInvoiceQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpInvoices(sampleCompanyId: UUID): Future[Seq[ErpInvoice]] =
    erpInvoiceService.all(sampleCompanyId)
}
