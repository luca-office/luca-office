package graphql.player.queries

import database.generated.public.CodingModel
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait CodingModelQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def codingModel(id: UUID): Future[Option[CodingModel]] =
    codingModelService.find(id)
}
