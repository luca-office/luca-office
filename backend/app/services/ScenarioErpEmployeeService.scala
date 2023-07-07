package services

import database.DatabaseContext
import database.generated.public.ScenarioErpEmployee
import models.{ScenarioErpEmployeeCreation, ScenarioErpEmployeeUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioErpEmployeeService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllScenarioErpEmployee
    with DefaultFindScenarioErpEmployee
    with DefaultCreateScenarioErpEmployee
    with DefaultUpdateScenarioErpEmployee
    with DefaultDeleteScenarioErpEmployee {
  val context = databaseContext

  import context._

  def all(scenarioId: UUID): Future[Seq[ScenarioErpEmployee]] =
    performIO(allScenarioErpEmployeesAction(scenarioId))

  def create(creation: ScenarioErpEmployeeCreation): Future[ScenarioErpEmployee] =
    performIO(createScenarioErpEmployeeAction(creation))
      .recover(defaultErrorHandler)

  def update(scenarioId: UUID, employeeId: Int, update: ScenarioErpEmployeeUpdate): Future[ScenarioErpEmployee] =
    performIO(updateScenarioErpEmployeeAction(scenarioId, employeeId, update))
      .recover(defaultErrorHandler)

  def delete(scenarioId: UUID, employeeId: Int): Future[ScenarioErpEmployee] =
    performIO(deleteScenarioErpEmployeeAction(scenarioId, employeeId))
}
