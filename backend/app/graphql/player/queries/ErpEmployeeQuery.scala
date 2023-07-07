package graphql.player.queries

import database.generated.public.ErpEmployee
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpEmployeeQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpEmployees(sampleCompanyId: UUID): Future[Seq[ErpEmployee]] =
    erpEmployeeService.all(sampleCompanyId)
}
