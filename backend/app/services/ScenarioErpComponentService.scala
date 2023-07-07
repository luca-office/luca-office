package services

import database.DatabaseContext
import database.generated.public.ScenarioErpComponent
import models.{ScenarioErpComponentCreation, ScenarioErpComponentUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioErpComponentService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllScenarioErpComponent
    with DefaultFindScenarioErpComponent
    with DefaultCreateScenarioErpComponent
    with DefaultUpdateScenarioErpComponent
    with DefaultDeleteScenarioErpComponent {
  val context = databaseContext

  import context._

  def all(scenarioId: UUID): Future[Seq[ScenarioErpComponent]] =
    performIO(allScenarioErpComponentsAction(scenarioId))

  def create(creation: ScenarioErpComponentCreation): Future[ScenarioErpComponent] =
    performIO(createScenarioErpComponentAction(creation))
      .recover(defaultErrorHandler)

  def update(scenarioId: UUID, componentId: Int, update: ScenarioErpComponentUpdate): Future[ScenarioErpComponent] =
    performIO(updateScenarioErpComponentAction(scenarioId, componentId, update))
      .recover(defaultErrorHandler)

  def delete(scenarioId: UUID, componentId: Int): Future[ScenarioErpComponent] =
    performIO(deleteScenarioErpComponentAction(scenarioId, componentId))
}
