package services

import database.DatabaseContext
import database.generated.public.ScenarioErpSupplier
import models.{ScenarioErpSupplierCreation, ScenarioErpSupplierUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioErpSupplierService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllScenarioErpSupplier
    with DefaultFindScenarioErpSupplier
    with DefaultCreateScenarioErpSupplier
    with DefaultUpdateScenarioErpSupplier
    with DefaultDeleteScenarioErpSupplier {
  val context = databaseContext

  import context._

  def all(scenarioId: UUID): Future[Seq[ScenarioErpSupplier]] =
    performIO(allScenarioErpSuppliersAction(scenarioId))

  def create(creation: ScenarioErpSupplierCreation): Future[ScenarioErpSupplier] =
    performIO(createScenarioErpSupplierAction(creation))
      .recover(defaultErrorHandler)

  def update(scenarioId: UUID, supplierId: Int, update: ScenarioErpSupplierUpdate): Future[ScenarioErpSupplier] =
    performIO(updateScenarioErpSupplierAction(scenarioId, supplierId, update))
      .recover(defaultErrorHandler)

  def delete(scenarioId: UUID, supplierId: Int): Future[ScenarioErpSupplier] =
    performIO(deleteScenarioErpSupplierAction(scenarioId, supplierId))
}
