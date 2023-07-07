package services.actions

import database.DatabaseContext
import database.generated.public.ScenarioUserAccount

import scala.concurrent.ExecutionContext

trait CreateBulkScenarioUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def createBulkScenarioUserAccountAction(scenarioUserAccounts: Seq[ScenarioUserAccount]) =
    runIO(createBulkScenarioUserAccountQuotation(scenarioUserAccounts))

  def createBulkScenarioUserAccountQuotation(scenarioUserAccounts: Seq[ScenarioUserAccount]) =
    quote(
      liftQuery(scenarioUserAccounts)
        .foreach(scenarioUserAccount =>
          query[ScenarioUserAccount]
            .insert(scenarioUserAccount)
            .returning(scenarioUserAccount => scenarioUserAccount)))
}
