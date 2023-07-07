package services.generated

import database.DatabaseContext
import database.generated.public.ScenarioErpOrderItem
import models.{ScenarioErpOrderItemCreation, ScenarioErpOrderItemUpdate}
import services.converters.ScenarioErpOrderItemConverter.toScenarioErpOrderItem

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllScenarioErpOrderItem {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allScenarioErpOrderItemsAction(scenarioId: UUID) =
    runIO(allScenarioErpOrderItemsQuotation(scenarioId))

  def allScenarioErpOrderItemsQuotation(scenarioId: UUID) =
    quote(query[ScenarioErpOrderItem].filter(_.scenarioId == lift(scenarioId)))
}

trait DefaultFindScenarioErpOrderItem {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findScenarioErpOrderItemAction(scenarioId: UUID, orderItemId: Int) =
    runIO(findScenarioErpOrderItemQuotation(scenarioId, orderItemId)).map(_.headOption)

  def findScenarioErpOrderItemQuotation(scenarioId: UUID, orderItemId: Int) =
    quote(
      query[ScenarioErpOrderItem]
        .filter(row => row.scenarioId == lift(scenarioId) && row.orderItemId == lift(orderItemId)))
}

trait DefaultCreateScenarioErpOrderItem {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createScenarioErpOrderItemAction(creation: ScenarioErpOrderItemCreation) =
    runIO(createScenarioErpOrderItemQuotation(creation))

  def createScenarioErpOrderItemQuotation(creation: ScenarioErpOrderItemCreation) =
    quote(
      query[ScenarioErpOrderItem]
        .insert(lift(toScenarioErpOrderItem(creation)))
        .returning(scenarioErpOrderItem => scenarioErpOrderItem))
}

trait DefaultUpdateScenarioErpOrderItem {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateScenarioErpOrderItemAction(scenarioId: UUID, orderItemId: Int, update: ScenarioErpOrderItemUpdate) =
    runIO(updateScenarioErpOrderItemQuotation(scenarioId, orderItemId, update))

  def updateScenarioErpOrderItemQuotation(scenarioId: UUID, orderItemId: Int, update: ScenarioErpOrderItemUpdate) =
    quote(
      query[ScenarioErpOrderItem]
        .filter(row => row.scenarioId == lift(scenarioId) && row.orderItemId == lift(orderItemId))
        .update(_.relevance -> lift(update.relevance))
        .returning(scenarioErpOrderItem => scenarioErpOrderItem))
}

trait DefaultDeleteScenarioErpOrderItem {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.EnumEncoders._

  def deleteScenarioErpOrderItemAction(scenarioId: UUID, orderItemId: Int) =
    runIO(deleteScenarioErpOrderItemQuotation(scenarioId, orderItemId))

  def deleteScenarioErpOrderItemQuotation(scenarioId: UUID, orderItemId: Int) =
    quote(
      query[ScenarioErpOrderItem]
        .filter(row => row.scenarioId == lift(scenarioId) && row.orderItemId == lift(orderItemId))
        .delete
        .returning(scenarioErpOrderItem => scenarioErpOrderItem))
}
