package graphql.player.queries

import database.generated.public.Email
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait EmailQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def emails(scenarioId: UUID): Future[Seq[Email]] =
    emailService.allEmails(scenarioId)
}
