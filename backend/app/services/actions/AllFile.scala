package services.actions

import database.DatabaseContext
import database.generated.public.File
import services.generated.DefaultAllEmail

import java.util.UUID
import scala.concurrent.ExecutionContext

trait AllFile extends AllDirectory with DefaultAllEmail {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allFilesForScenarioAction(scenarioId: UUID) =
    runIO(allFilesForScenarioQuotation(scenarioId))

  def allFilesForScenarioQuotation(scenarioId: UUID) =
    quote(
      query[File].filter(file =>
        directoryIdsForScenarioQuotation(scenarioId).contains(file.directoryId)
          || emailIdsForScenarioQuotation(scenarioId).contains(file.emailId)))

  private def directoryIdsForScenarioQuotation(scenarioId: UUID) =
    quote(allDirectoriesForScenarioQuotation(scenarioId).map(_.id))

  private def emailIdsForScenarioQuotation(scenarioId: UUID) =
    quote(allEmailsQuotation(scenarioId).map(_.id))

  def allFilesForSampleCompanyAction(sampleCompanyId: UUID) =
    runIO(allFilesForSampleCompanyQuotation(sampleCompanyId))

  def allFilesForSampleCompanyQuotation(sampleCompanyId: UUID) =
    quote(query[File].filter(file => directoryIdsForSampleCompanyQuotation(sampleCompanyId).contains(file.directoryId)))

  private def directoryIdsForSampleCompanyQuotation(sampleCompanyId: UUID) =
    quote(allDirectoriesForSampleCompanyQuotation(sampleCompanyId).map(_.id))
}
