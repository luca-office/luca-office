package graphql.player.queries

import database.generated.public.ErpComponentErpProduct
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpComponentErpProductQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpComponentErpProducts(sampleCompanyId: UUID): Future[Seq[ErpComponentErpProduct]] =
    erpComponentErpProductService.all(sampleCompanyId)
}
