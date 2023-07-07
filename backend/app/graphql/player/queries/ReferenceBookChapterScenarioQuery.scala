package graphql.player.queries

import database.generated.public.ReferenceBookChapter
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ReferenceBookChapterScenarioQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def referenceBookChaptersForScenario(scenarioId: UUID): Future[Seq[ReferenceBookChapter]] =
    referenceBookChapterScenarioService.referenceBookChaptersForScenario(scenarioId)
}
