package graphql.backoffice.queries

import database.generated.public.ScenarioQuestionnaire
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioQuestionnaireQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioQuestionnaires(scenarioId: UUID): Future[Seq[ScenarioQuestionnaire]] =
    scenarioQuestionnaireService.all(scenarioId)
}
