package services

import database.DatabaseContext
import database.generated.public.Directory
import services.actions.AllDirectory
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class DirectoryService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends AllDirectory
    with DefaultFindDirectory
    with DefaultCreateDirectory
    with DefaultUpdateDirectory
    with DefaultDeleteDirectory {
  val context = databaseContext

  import context._

  def allDirectoriesForScenario(scenarioId: UUID): Future[Seq[Directory]] =
    performIO(allDirectoriesForScenarioAction(scenarioId))

  def allDirectoriesForSampleCompany(sampleCompanyId: UUID): Future[Seq[Directory]] =
    performIO(allDirectoriesForSampleCompanyAction(sampleCompanyId))

  def findIdForSampleCompany(sampleCompanyId: UUID): Future[Option[UUID]] =
    run(query[Directory].filter(_.sampleCompanyId.contains(lift(sampleCompanyId))).map(_.id)).map(_.headOption)
}
