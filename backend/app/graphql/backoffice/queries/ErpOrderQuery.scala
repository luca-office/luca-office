package graphql.backoffice.queries

import database.generated.public.ErpOrder
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpOrderQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpOrders(sampleCompanyId: UUID): Future[Seq[ErpOrder]] =
    erpOrderService.all(sampleCompanyId)
}
