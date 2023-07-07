package graphql.player.queries

import database.generated.public.ErpCustomer
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpCustomerQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpCustomers(sampleCompanyId: UUID): Future[Seq[ErpCustomer]] =
    erpCustomerService.all(sampleCompanyId)
}
