package services

import database.DatabaseContext
import database.generated.public.ScenarioErpProduct
import models.{ScenarioErpProductCreation, ScenarioErpProductUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioErpProductService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllScenarioErpProduct
    with DefaultFindScenarioErpProduct
    with DefaultCreateScenarioErpProduct
    with DefaultUpdateScenarioErpProduct
    with DefaultDeleteScenarioErpProduct {
  val context = databaseContext

  import context._

  def all(scenarioId: UUID): Future[Seq[ScenarioErpProduct]] =
    performIO(allScenarioErpProductsAction(scenarioId))

  def create(creation: ScenarioErpProductCreation): Future[ScenarioErpProduct] =
    performIO(createScenarioErpProductAction(creation))
      .recover(defaultErrorHandler)

  def update(scenarioId: UUID, productId: Int, update: ScenarioErpProductUpdate): Future[ScenarioErpProduct] =
    performIO(updateScenarioErpProductAction(scenarioId, productId, update))
      .recover(defaultErrorHandler)

  def delete(scenarioId: UUID, productId: Int): Future[ScenarioErpProduct] =
    performIO(deleteScenarioErpProductAction(scenarioId, productId))
}
