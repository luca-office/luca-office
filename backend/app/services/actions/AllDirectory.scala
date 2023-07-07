package services.actions

import database.DatabaseContext
import database.generated.public.Directory

import java.util.UUID
import scala.concurrent.ExecutionContext

trait AllDirectory {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allDirectoriesForScenarioAction(scenarioId: UUID) =
    runIO(allDirectoriesForScenarioQuotation(scenarioId))

  def allDirectoriesForScenarioQuotation(scenarioId: UUID) =
    quote(query[Directory].filter(_.scenarioId.contains(lift(scenarioId))))

  def allDirectoriesForScenariosQuotation(scenarioIds: Seq[UUID]) =
    quote(query[Directory].filter(_.scenarioId.exists(scenarioId => liftQuery(scenarioIds).contains(scenarioId))))

  def allDirectoriesForSampleCompanyAction(sampleCompanyId: UUID) =
    runIO(allDirectoriesForSampleCompanyQuotation(sampleCompanyId))

  def allDirectoriesForSampleCompanyQuotation(sampleCompanyId: UUID) =
    quote(query[Directory].filter(_.sampleCompanyId.contains(lift(sampleCompanyId))))
}
