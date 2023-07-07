package graphql.player.queries

import database.generated.public.CodingDimension
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait CodingDimensionQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def codingDimensions(modelId: UUID): Future[Seq[CodingDimension]] =
    codingDimensionService.all(modelId)
}
