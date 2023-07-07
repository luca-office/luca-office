package services

import database.DatabaseContext
import database.generated.public.ScenarioErpComponentErpProduct
import models.{ScenarioErpComponentErpProductCreation, ScenarioErpComponentErpProductUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioErpComponentErpProductService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllScenarioErpComponentErpProduct
    with DefaultFindScenarioErpComponentErpProduct
    with DefaultCreateScenarioErpComponentErpProduct
    with DefaultUpdateScenarioErpComponentErpProduct
    with DefaultDeleteScenarioErpComponentErpProduct {
  val context = databaseContext

  import context._

  def all(scenarioId: UUID): Future[Seq[ScenarioErpComponentErpProduct]] =
    performIO(allScenarioErpComponentErpProductsAction(scenarioId))

  def create(creation: ScenarioErpComponentErpProductCreation): Future[ScenarioErpComponentErpProduct] =
    performIO(createScenarioErpComponentErpProductAction(creation))
      .recover(defaultErrorHandler)

  def update(
      scenarioId: UUID,
      componentProductId: Int,
      update: ScenarioErpComponentErpProductUpdate): Future[ScenarioErpComponentErpProduct] =
    performIO(updateScenarioErpComponentErpProductAction(scenarioId, componentProductId, update))
      .recover(defaultErrorHandler)

  def delete(scenarioId: UUID, componentProductId: Int): Future[ScenarioErpComponentErpProduct] =
    performIO(deleteScenarioErpComponentErpProductAction(scenarioId, componentProductId))
}
