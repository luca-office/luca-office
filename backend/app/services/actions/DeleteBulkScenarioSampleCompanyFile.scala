package services.actions

import database.DatabaseContext
import database.generated.public.ScenarioSampleCompanyFile

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DeleteBulkScenarioSampleCompanyFile {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def deleteBulkScenarioSampleCompanyFileAction(scenarioId: UUID) =
    runIO(deleteBulkScenarioSampleCompanyFileQuotation(scenarioId))

  def deleteBulkScenarioSampleCompanyFileQuotation(scenarioId: UUID) =
    quote(
      query[ScenarioSampleCompanyFile]
        .filter(_.scenarioId == lift(scenarioId))
        .delete)
}
