package graphql.player.queries

import graphql.Private
import graphql.player.PlayerContext
import models.InterventionBase
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait InterventionQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def interventions(scenarioId: UUID): Future[Seq[InterventionBase]] =
    interventionService.all(scenarioId)
}
