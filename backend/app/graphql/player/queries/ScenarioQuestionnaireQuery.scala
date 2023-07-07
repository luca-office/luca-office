package graphql.player.queries

import database.generated.public.ScenarioQuestionnaire
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioQuestionnaireQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioQuestionnaires(scenarioId: UUID): Future[Seq[ScenarioQuestionnaire]] =
    scenarioQuestionnaireService.all(scenarioId)
}
