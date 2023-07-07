package graphql.player.queries

import database.generated.public.ErpSupplier
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpSupplierQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpSuppliers(sampleCompanyId: UUID): Future[Seq[ErpSupplier]] =
    erpSupplierService.all(sampleCompanyId)
}
