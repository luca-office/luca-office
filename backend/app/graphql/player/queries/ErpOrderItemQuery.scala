package graphql.player.queries

import database.generated.public.ErpOrderItem
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpOrderItemQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpOrderItems(sampleCompanyId: UUID): Future[Seq[ErpOrderItem]] =
    erpOrderItemService.all(sampleCompanyId)
}
