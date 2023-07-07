package graphql.player.queries

import database.generated.public.ErpComponent
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpComponentQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpComponents(sampleCompanyId: UUID): Future[Seq[ErpComponent]] =
    erpComponentService.all(sampleCompanyId)
}
