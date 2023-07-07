package services.generated

import database.DatabaseContext
import database.generated.public.ScenarioErpOrder
import models.{ScenarioErpOrderCreation, ScenarioErpOrderUpdate}
import services.converters.ScenarioErpOrderConverter.toScenarioErpOrder

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllScenarioErpOrder {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allScenarioErpOrdersAction(scenarioId: UUID) =
    runIO(allScenarioErpOrdersQuotation(scenarioId))

  def allScenarioErpOrdersQuotation(scenarioId: UUID) =
    quote(query[ScenarioErpOrder].filter(_.scenarioId == lift(scenarioId)))
}

trait DefaultFindScenarioErpOrder {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findScenarioErpOrderAction(scenarioId: UUID, orderId: Int) =
    runIO(findScenarioErpOrderQuotation(scenarioId, orderId)).map(_.headOption)

  def findScenarioErpOrderQuotation(scenarioId: UUID, orderId: Int) =
    quote(
      query[ScenarioErpOrder]
        .filter(row => row.scenarioId == lift(scenarioId) && row.orderId == lift(orderId)))
}

trait DefaultCreateScenarioErpOrder {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createScenarioErpOrderAction(creation: ScenarioErpOrderCreation) =
    runIO(createScenarioErpOrderQuotation(creation))

  def createScenarioErpOrderQuotation(creation: ScenarioErpOrderCreation) =
    quote(
      query[ScenarioErpOrder]
        .insert(lift(toScenarioErpOrder(creation)))
        .returning(scenarioErpOrder => scenarioErpOrder))
}

trait DefaultUpdateScenarioErpOrder {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateScenarioErpOrderAction(scenarioId: UUID, orderId: Int, update: ScenarioErpOrderUpdate) =
    runIO(updateScenarioErpOrderQuotation(scenarioId, orderId, update))

  def updateScenarioErpOrderQuotation(scenarioId: UUID, orderId: Int, update: ScenarioErpOrderUpdate) =
    quote(
      query[ScenarioErpOrder]
        .filter(row => row.scenarioId == lift(scenarioId) && row.orderId == lift(orderId))
        .update(_.relevance -> lift(update.relevance))
        .returning(scenarioErpOrder => scenarioErpOrder))
}

trait DefaultDeleteScenarioErpOrder {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.EnumEncoders._

  def deleteScenarioErpOrderAction(scenarioId: UUID, orderId: Int) =
    runIO(deleteScenarioErpOrderQuotation(scenarioId, orderId))

  def deleteScenarioErpOrderQuotation(scenarioId: UUID, orderId: Int) =
    quote(
      query[ScenarioErpOrder]
        .filter(row => row.scenarioId == lift(scenarioId) && row.orderId == lift(orderId))
        .delete
        .returning(scenarioErpOrder => scenarioErpOrder))
}
