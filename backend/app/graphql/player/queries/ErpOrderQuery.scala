package graphql.player.queries

import database.generated.public.ErpOrder
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpOrderQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpOrders(sampleCompanyId: UUID): Future[Seq[ErpOrder]] =
    erpOrderService.all(sampleCompanyId)
}
