package services.generated

import database.DatabaseContext
import database.generated.public.ScenarioSampleCompanyFile
import models.{ScenarioSampleCompanyFileCreation, ScenarioSampleCompanyFileUpdate}
import services.converters.ScenarioSampleCompanyFileConverter.toScenarioSampleCompanyFile

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllScenarioSampleCompanyFile {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allScenarioSampleCompanyFileAction(scenarioId: UUID) =
    runIO(allScenarioSampleCompanyFileQuotation(scenarioId))

  def allScenarioSampleCompanyFileQuotation(scenarioId: UUID) =
    quote(query[ScenarioSampleCompanyFile].filter(_.scenarioId == lift(scenarioId)))
}

trait DefaultFindScenarioSampleCompanyFile {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findScenarioSampleCompanyFileAction(scenarioId: UUID, fileId: UUID) =
    runIO(findScenarioSampleCompanyFileQuotation(scenarioId, fileId)).map(_.headOption)

  def findScenarioSampleCompanyFileQuotation(scenarioId: UUID, fileId: UUID) =
    quote(
      query[ScenarioSampleCompanyFile].filter(row => row.scenarioId == lift(scenarioId) && row.fileId == lift(fileId)))
}

trait DefaultCreateScenarioSampleCompanyFile {
  val context: DatabaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createQuotation(creation: ScenarioSampleCompanyFileCreation) =
    quote(
      query[ScenarioSampleCompanyFile]
        .insert(lift(toScenarioSampleCompanyFile(creation)))
        .returning(scenarioSampleCompanyFile => scenarioSampleCompanyFile))
}

trait DefaultUpdateScenarioSampleCompanyFile {
  val context: DatabaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateQuotation(scenarioId: UUID, fileId: UUID, update: ScenarioSampleCompanyFileUpdate) =
    quote(
      query[ScenarioSampleCompanyFile]
        .filter(row => row.scenarioId == lift(scenarioId) && row.fileId == lift(fileId))
        .update(_.relevance -> lift(update.relevance))
        .returning(scenarioSampleCompanyFile => scenarioSampleCompanyFile))
}

trait DefaultDeleteScenarioSampleCompanyFile {
  val context: DatabaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def deleteQuotation(scenarioId: UUID, fileId: UUID) =
    quote(
      query[ScenarioSampleCompanyFile]
        .filter(row => row.scenarioId == lift(scenarioId) && row.fileId == lift(fileId))
        .delete
        .returning(scenarioSampleCompanyFile => scenarioSampleCompanyFile))
}
