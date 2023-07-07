package services.actions

import database.DatabaseContext
import database.generated.public.ScenarioQuestionnaire

import scala.concurrent.ExecutionContext

trait CreateBulkScenarioQuestionnaire {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def createBulkScenarioQuestionnaireAction(scenarioQuestionnaires: Seq[ScenarioQuestionnaire]) =
    runIO(createBulkScenarioQuestionnaireQuotation(scenarioQuestionnaires))

  def createBulkScenarioQuestionnaireQuotation(scenarioQuestionnaires: Seq[ScenarioQuestionnaire]) =
    quote(
      liftQuery(scenarioQuestionnaires)
        .foreach(scenarioQuestionnaire =>
          query[ScenarioQuestionnaire]
            .insert(scenarioQuestionnaire)
            .returning(scenarioQuestionnaire => scenarioQuestionnaire)))
}
