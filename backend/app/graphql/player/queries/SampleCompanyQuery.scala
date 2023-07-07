package graphql.player.queries

import database.generated.public.SampleCompany
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SampleCompanyQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def sampleCompany(id: UUID): Future[Option[SampleCompany]] =
    sampleCompanyService.findWithoutUserAccount(id)
}
