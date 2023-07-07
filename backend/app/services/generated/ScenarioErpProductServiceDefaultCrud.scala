package services.generated

import database.DatabaseContext
import database.generated.public.ScenarioErpProduct
import models.{ScenarioErpProductCreation, ScenarioErpProductUpdate}
import services.converters.ScenarioErpProductConverter.toScenarioErpProduct

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllScenarioErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allScenarioErpProductsAction(scenarioId: UUID) =
    runIO(allScenarioErpProductsQuotation(scenarioId))

  def allScenarioErpProductsQuotation(scenarioId: UUID) =
    quote(query[ScenarioErpProduct].filter(_.scenarioId == lift(scenarioId)))
}

trait DefaultFindScenarioErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findScenarioErpProductAction(scenarioId: UUID, productId: Int) =
    runIO(findScenarioErpProductQuotation(scenarioId, productId)).map(_.headOption)

  def findScenarioErpProductQuotation(scenarioId: UUID, productId: Int) =
    quote(
      query[ScenarioErpProduct]
        .filter(row => row.scenarioId == lift(scenarioId) && row.productId == lift(productId)))
}

trait DefaultCreateScenarioErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createScenarioErpProductAction(creation: ScenarioErpProductCreation) =
    runIO(createScenarioErpProductQuotation(creation))

  def createScenarioErpProductQuotation(creation: ScenarioErpProductCreation) =
    quote(
      query[ScenarioErpProduct]
        .insert(lift(toScenarioErpProduct(creation)))
        .returning(scenarioErpProduct => scenarioErpProduct))
}

trait DefaultUpdateScenarioErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateScenarioErpProductAction(scenarioId: UUID, productId: Int, update: ScenarioErpProductUpdate) =
    runIO(updateScenarioErpProductQuotation(scenarioId, productId, update))

  def updateScenarioErpProductQuotation(scenarioId: UUID, productId: Int, update: ScenarioErpProductUpdate) =
    quote(
      query[ScenarioErpProduct]
        .filter(row => row.scenarioId == lift(scenarioId) && row.productId == lift(productId))
        .update(_.relevance -> lift(update.relevance))
        .returning(scenarioErpProduct => scenarioErpProduct))
}

trait DefaultDeleteScenarioErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.EnumEncoders._

  def deleteScenarioErpProductAction(scenarioId: UUID, productId: Int) =
    runIO(deleteScenarioErpProductQuotation(scenarioId, productId))

  def deleteScenarioErpProductQuotation(scenarioId: UUID, productId: Int) =
    quote(
      query[ScenarioErpProduct]
        .filter(row => row.scenarioId == lift(scenarioId) && row.productId == lift(productId))
        .delete
        .returning(scenarioErpProduct => scenarioErpProduct))
}
