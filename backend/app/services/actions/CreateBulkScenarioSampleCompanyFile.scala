package services.actions

import database.DatabaseContext
import database.generated.public.ScenarioSampleCompanyFile

import scala.concurrent.ExecutionContext

trait CreateBulkScenarioSampleCompanyFile {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.EnumEncoders._

  def createBulkScenarioSampleCompanyFileAction(scenarioSampleCompanyFiles: Seq[ScenarioSampleCompanyFile]) =
    runIO(createBulkScenarioSampleCompanyFileQuotation(scenarioSampleCompanyFiles))

  def createBulkScenarioSampleCompanyFileQuotation(scenarioSampleCompanyFiles: Seq[ScenarioSampleCompanyFile]) =
    quote(
      liftQuery(scenarioSampleCompanyFiles)
        .foreach(scenarioSampleCompanyFile =>
          query[ScenarioSampleCompanyFile]
            .insert(scenarioSampleCompanyFile)
            .returning(scenarioSampleCompanyFile => scenarioSampleCompanyFile)))
}
