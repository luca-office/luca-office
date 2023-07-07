package services

import database.DatabaseContext
import database.generated.public.ScenarioSampleCompanyFile
import models.{ScenarioSampleCompanyFileCreation, ScenarioSampleCompanyFileUpdate}
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioSampleCompanyFileService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllScenarioSampleCompanyFile
    with DefaultFindScenarioSampleCompanyFile
    with DefaultCreateScenarioSampleCompanyFile
    with DefaultUpdateScenarioSampleCompanyFile
    with DefaultDeleteScenarioSampleCompanyFile {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all(scenarioId: UUID): Future[Seq[ScenarioSampleCompanyFile]] =
    performIO(allScenarioSampleCompanyFileAction(scenarioId))

  def find(scenarioId: UUID, fileId: UUID): Future[Option[ScenarioSampleCompanyFile]] =
    performIO(findScenarioSampleCompanyFileAction(scenarioId, fileId))

  def create(creation: ScenarioSampleCompanyFileCreation): Future[ScenarioSampleCompanyFile] =
    run(createQuotation(creation))

  def update(
      scenarioId: UUID,
      fileId: UUID,
      update: ScenarioSampleCompanyFileUpdate): Future[ScenarioSampleCompanyFile] =
    run(updateQuotation(scenarioId, fileId, update))

  def delete(scenarioId: UUID, fileId: UUID): Future[ScenarioSampleCompanyFile] =
    run(deleteQuotation(scenarioId, fileId))
}
