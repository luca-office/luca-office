package services

import database.DatabaseContext
import database.generated.public.ScenarioErpOrderItem
import models.{ScenarioErpOrderItemCreation, ScenarioErpOrderItemUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioErpOrderItemService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllScenarioErpOrderItem
    with DefaultFindScenarioErpOrderItem
    with DefaultCreateScenarioErpOrderItem
    with DefaultUpdateScenarioErpOrderItem
    with DefaultDeleteScenarioErpOrderItem {
  val context = databaseContext

  import context._

  def all(scenarioId: UUID): Future[Seq[ScenarioErpOrderItem]] =
    performIO(allScenarioErpOrderItemsAction(scenarioId))

  def create(creation: ScenarioErpOrderItemCreation): Future[ScenarioErpOrderItem] =
    performIO(createScenarioErpOrderItemAction(creation))
      .recover(defaultErrorHandler)

  def update(scenarioId: UUID, orderItemId: Int, update: ScenarioErpOrderItemUpdate): Future[ScenarioErpOrderItem] =
    performIO(updateScenarioErpOrderItemAction(scenarioId, orderItemId, update))
      .recover(defaultErrorHandler)

  def delete(scenarioId: UUID, orderItemId: Int): Future[ScenarioErpOrderItem] =
    performIO(deleteScenarioErpOrderItemAction(scenarioId, orderItemId))
}
