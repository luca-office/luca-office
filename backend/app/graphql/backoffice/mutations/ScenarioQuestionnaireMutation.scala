package graphql.backoffice.mutations

import database.generated.public.ScenarioQuestionnaire
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ScenarioQuestionnaireCreation, ScenarioQuestionnaireUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioQuestionnaireMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createScenarioQuestionnaire(creation: ScenarioQuestionnaireCreation): Future[ScenarioQuestionnaire] =
    scenarioQuestionnaireService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateScenarioQuestionnaire(
      scenarioId: UUID,
      questionnaireId: UUID,
      update: ScenarioQuestionnaireUpdate): Future[ScenarioQuestionnaire] =
    scenarioQuestionnaireService.update(scenarioId, questionnaireId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteScenarioQuestionnaire(scenarioId: UUID, questionnaireId: UUID): Future[ScenarioQuestionnaire] =
    scenarioQuestionnaireService.delete(scenarioId, questionnaireId)
}
