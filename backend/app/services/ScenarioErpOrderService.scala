package services

import database.DatabaseContext
import database.generated.public.ScenarioErpOrder
import models.{ScenarioErpOrderCreation, ScenarioErpOrderUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioErpOrderService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllScenarioErpOrder
    with DefaultFindScenarioErpOrder
    with DefaultCreateScenarioErpOrder
    with DefaultUpdateScenarioErpOrder
    with DefaultDeleteScenarioErpOrder {
  val context = databaseContext

  import context._

  def all(scenarioId: UUID): Future[Seq[ScenarioErpOrder]] =
    performIO(allScenarioErpOrdersAction(scenarioId))

  def create(creation: ScenarioErpOrderCreation): Future[ScenarioErpOrder] =
    performIO(createScenarioErpOrderAction(creation))
      .recover(defaultErrorHandler)

  def update(scenarioId: UUID, orderId: Int, update: ScenarioErpOrderUpdate): Future[ScenarioErpOrder] =
    performIO(updateScenarioErpOrderAction(scenarioId, orderId, update))
      .recover(defaultErrorHandler)

  def delete(scenarioId: UUID, orderId: Int): Future[ScenarioErpOrder] =
    performIO(deleteScenarioErpOrderAction(scenarioId, orderId))
}
