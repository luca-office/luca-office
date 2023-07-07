package graphql.player.queries

import database.generated.public.CodingCriterion
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait CodingCriteriaQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def codingCriteria(itemId: UUID): Future[Seq[CodingCriterion]] =
    codingCriterionService.allCodingCriteria(itemId)
}
