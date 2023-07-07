package services.generated

import database.DatabaseContext
import database.generated.public.ScenarioErpEmployee
import models.{ScenarioErpEmployeeCreation, ScenarioErpEmployeeUpdate}
import services.converters.ScenarioErpEmployeeConverter.toScenarioErpEmployee

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllScenarioErpEmployee {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allScenarioErpEmployeesAction(scenarioId: UUID) =
    runIO(allScenarioErpEmployeesQuotation(scenarioId))

  def allScenarioErpEmployeesQuotation(scenarioId: UUID) =
    quote(query[ScenarioErpEmployee].filter(_.scenarioId == lift(scenarioId)))
}

trait DefaultFindScenarioErpEmployee {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findScenarioErpEmployeeAction(scenarioId: UUID, employeeId: Int) =
    runIO(findScenarioErpEmployeeQuotation(scenarioId, employeeId)).map(_.headOption)

  def findScenarioErpEmployeeQuotation(scenarioId: UUID, employeeId: Int) =
    quote(
      query[ScenarioErpEmployee]
        .filter(row => row.scenarioId == lift(scenarioId) && row.employeeId == lift(employeeId)))
}

trait DefaultCreateScenarioErpEmployee {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createScenarioErpEmployeeAction(creation: ScenarioErpEmployeeCreation) =
    runIO(createScenarioErpEmployeeQuotation(creation))

  def createScenarioErpEmployeeQuotation(creation: ScenarioErpEmployeeCreation) =
    quote(
      query[ScenarioErpEmployee]
        .insert(lift(toScenarioErpEmployee(creation)))
        .returning(scenarioErpEmployee => scenarioErpEmployee))
}

trait DefaultUpdateScenarioErpEmployee {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateScenarioErpEmployeeAction(scenarioId: UUID, employeeId: Int, update: ScenarioErpEmployeeUpdate) =
    runIO(updateScenarioErpEmployeeQuotation(scenarioId, employeeId, update))

  def updateScenarioErpEmployeeQuotation(scenarioId: UUID, employeeId: Int, update: ScenarioErpEmployeeUpdate) =
    quote(
      query[ScenarioErpEmployee]
        .filter(row => row.scenarioId == lift(scenarioId) && row.employeeId == lift(employeeId))
        .update(_.relevance -> lift(update.relevance))
        .returning(scenarioErpEmployee => scenarioErpEmployee))
}

trait DefaultDeleteScenarioErpEmployee {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.EnumEncoders._

  def deleteScenarioErpEmployeeAction(scenarioId: UUID, employeeId: Int) =
    runIO(deleteScenarioErpEmployeeQuotation(scenarioId, employeeId))

  def deleteScenarioErpEmployeeQuotation(scenarioId: UUID, employeeId: Int) =
    quote(
      query[ScenarioErpEmployee]
        .filter(row => row.scenarioId == lift(scenarioId) && row.employeeId == lift(employeeId))
        .delete
        .returning(scenarioErpEmployee => scenarioErpEmployee))
}
