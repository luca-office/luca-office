package services.generated

import database.DatabaseContext
import database.generated.public.ScenarioQuestionnaire
import models.{ScenarioQuestionnaireCreation, ScenarioQuestionnaireUpdate}
import services.converters.ScenarioQuestionnaireConverter.toScenarioQuestionnaire

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultCreateScenarioQuestionnaire {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def createQuotation(creation: ScenarioQuestionnaireCreation) =
    quote(
      query[ScenarioQuestionnaire]
        .insert(lift(toScenarioQuestionnaire(creation)))
        .returning(scenario => scenario))
}

trait DefaultUpdateScenarioQuestionnaire {
  val context: DatabaseContext

  import context._

  def updateQuotation(scenarioId: UUID, questionnaireId: UUID, update: ScenarioQuestionnaireUpdate) =
    quote(
      query[ScenarioQuestionnaire]
        .filter(row => row.scenarioId == lift(scenarioId) && row.questionnaireId == lift(questionnaireId))
        .update(_.activationDelayInSeconds -> lift(update.activationDelayInSeconds))
        .returning(scenarioQuestionnaire => scenarioQuestionnaire))
}

trait DefaultDeleteScenarioQuestionnaire {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteQuotation(scenarioId: UUID, questionnaireId: UUID) =
    quote(
      query[ScenarioQuestionnaire]
        .filter(row => row.scenarioId == lift(scenarioId) && row.questionnaireId == lift(questionnaireId))
        .delete
        .returning(scenarioQuestionnaire => scenarioQuestionnaire))
}
