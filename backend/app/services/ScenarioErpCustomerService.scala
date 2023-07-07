package services

import database.DatabaseContext
import database.generated.public.ScenarioErpCustomer
import models.{ScenarioErpCustomerCreation, ScenarioErpCustomerUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioErpCustomerService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllScenarioErpCustomer
    with DefaultFindScenarioErpCustomer
    with DefaultCreateScenarioErpCustomer
    with DefaultUpdateScenarioErpCustomer
    with DefaultDeleteScenarioErpCustomer {
  val context = databaseContext

  import context._

  def all(scenarioId: UUID): Future[Seq[ScenarioErpCustomer]] =
    performIO(allScenarioErpCustomersAction(scenarioId))

  def create(creation: ScenarioErpCustomerCreation): Future[ScenarioErpCustomer] =
    performIO(createScenarioErpCustomerAction(creation))
      .recover(defaultErrorHandler)

  def update(scenarioId: UUID, customerId: Int, update: ScenarioErpCustomerUpdate): Future[ScenarioErpCustomer] =
    performIO(updateScenarioErpCustomerAction(scenarioId, customerId, update))
      .recover(defaultErrorHandler)

  def delete(scenarioId: UUID, customerId: Int): Future[ScenarioErpCustomer] =
    performIO(deleteScenarioErpCustomerAction(scenarioId, customerId))
}
