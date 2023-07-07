package graphql.player.queries

import database.generated.public.Project
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ProjectQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def project(id: UUID): Future[Option[Project]] =
    projectService.findWithoutUserAccount(id)
}
