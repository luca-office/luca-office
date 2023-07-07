package graphql.player.queries

import graphql.Private
import graphql.player.PlayerContext
import models.ScenarioCodingAutomatedCriterionBase
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioCodingAutomatedCriteriaQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioCodingAutomatedCriteria(itemId: UUID): Future[Seq[ScenarioCodingAutomatedCriterionBase]] =
    scenarioCodingAutomatedCriterionService.all(itemId)
}
