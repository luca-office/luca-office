package graphql.player.queries

import database.generated.public.ProjectModule
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ProjectModuleQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def projectModules(projectId: UUID): Future[Seq[ProjectModule]] =
    projectModuleService.all(projectId)
}
