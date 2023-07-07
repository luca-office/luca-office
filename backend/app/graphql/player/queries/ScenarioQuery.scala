package graphql.player.queries

import database.generated.public.Scenario
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenario(id: UUID): Future[Option[Scenario]] =
    scenarioService.findWithoutUserAccount(id)
}
