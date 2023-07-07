package graphql.backoffice.queries

import database.generated.public.ErpOrderItem
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpOrderItemQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpOrderItems(sampleCompanyId: UUID): Future[Seq[ErpOrderItem]] =
    erpOrderItemService.all(sampleCompanyId)
}
