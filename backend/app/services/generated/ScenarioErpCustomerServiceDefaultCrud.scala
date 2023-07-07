package services.generated

import database.DatabaseContext
import database.generated.public.ScenarioErpCustomer
import models.{ScenarioErpCustomerCreation, ScenarioErpCustomerUpdate}
import services.converters.ScenarioErpCustomerConverter.toScenarioErpCustomer

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllScenarioErpCustomer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allScenarioErpCustomersAction(scenarioId: UUID) =
    runIO(allScenarioErpCustomersQuotation(scenarioId))

  def allScenarioErpCustomersQuotation(scenarioId: UUID) =
    quote(query[ScenarioErpCustomer].filter(_.scenarioId == lift(scenarioId)))
}

trait DefaultFindScenarioErpCustomer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findScenarioErpCustomerAction(scenarioId: UUID, customerId: Int) =
    runIO(findScenarioErpCustomerQuotation(scenarioId, customerId)).map(_.headOption)

  def findScenarioErpCustomerQuotation(scenarioId: UUID, customerId: Int) =
    quote(
      query[ScenarioErpCustomer]
        .filter(row => row.scenarioId == lift(scenarioId) && row.customerId == lift(customerId)))
}

trait DefaultCreateScenarioErpCustomer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createScenarioErpCustomerAction(creation: ScenarioErpCustomerCreation) =
    runIO(createScenarioErpCustomerQuotation(creation))

  def createScenarioErpCustomerQuotation(creation: ScenarioErpCustomerCreation) =
    quote(
      query[ScenarioErpCustomer]
        .insert(lift(toScenarioErpCustomer(creation)))
        .returning(scenarioErpCustomer => scenarioErpCustomer))
}

trait DefaultUpdateScenarioErpCustomer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateScenarioErpCustomerAction(scenarioId: UUID, customerId: Int, update: ScenarioErpCustomerUpdate) =
    runIO(updateScenarioErpCustomerQuotation(scenarioId, customerId, update))

  def updateScenarioErpCustomerQuotation(scenarioId: UUID, customerId: Int, update: ScenarioErpCustomerUpdate) =
    quote(
      query[ScenarioErpCustomer]
        .filter(row => row.scenarioId == lift(scenarioId) && row.customerId == lift(customerId))
        .update(_.relevance -> lift(update.relevance))
        .returning(scenarioErpCustomer => scenarioErpCustomer))
}

trait DefaultDeleteScenarioErpCustomer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.EnumEncoders._

  def deleteScenarioErpCustomerAction(scenarioId: UUID, customerId: Int) =
    runIO(deleteScenarioErpCustomerQuotation(scenarioId, customerId))

  def deleteScenarioErpCustomerQuotation(scenarioId: UUID, customerId: Int) =
    quote(
      query[ScenarioErpCustomer]
        .filter(row => row.scenarioId == lift(scenarioId) && row.customerId == lift(customerId))
        .delete
        .returning(scenarioErpCustomer => scenarioErpCustomer))
}
