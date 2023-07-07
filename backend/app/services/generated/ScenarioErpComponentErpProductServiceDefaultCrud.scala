package services.generated

import database.DatabaseContext
import database.generated.public.ScenarioErpComponentErpProduct
import models.{ScenarioErpComponentErpProductCreation, ScenarioErpComponentErpProductUpdate}
import services.converters.ScenarioErpComponentErpProductConverter.toScenarioErpComponentErpProduct

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllScenarioErpComponentErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allScenarioErpComponentErpProductsAction(scenarioId: UUID) =
    runIO(allScenarioErpComponentErpProductsQuotation(scenarioId))

  def allScenarioErpComponentErpProductsQuotation(scenarioId: UUID) =
    quote(query[ScenarioErpComponentErpProduct].filter(_.scenarioId == lift(scenarioId)))
}

trait DefaultFindScenarioErpComponentErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findScenarioErpComponentErpProductAction(scenarioId: UUID, componentProductId: Int) =
    runIO(findScenarioErpComponentErpProductQuotation(scenarioId, componentProductId)).map(_.headOption)

  def findScenarioErpComponentErpProductQuotation(scenarioId: UUID, componentProductId: Int) =
    quote(
      query[ScenarioErpComponentErpProduct]
        .filter(row => row.scenarioId == lift(scenarioId) && row.componentProductId == lift(componentProductId)))
}

trait DefaultCreateScenarioErpComponentErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createScenarioErpComponentErpProductAction(creation: ScenarioErpComponentErpProductCreation) =
    runIO(createScenarioErpComponentErpProductQuotation(creation))

  def createScenarioErpComponentErpProductQuotation(creation: ScenarioErpComponentErpProductCreation) =
    quote(
      query[ScenarioErpComponentErpProduct]
        .insert(lift(toScenarioErpComponentErpProduct(creation)))
        .returning(scenarioErpComponentErpProduct => scenarioErpComponentErpProduct))
}

trait DefaultUpdateScenarioErpComponentErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateScenarioErpComponentErpProductAction(
      scenarioId: UUID,
      componentProductId: Int,
      update: ScenarioErpComponentErpProductUpdate) =
    runIO(updateScenarioErpComponentErpProductQuotation(scenarioId, componentProductId, update))

  def updateScenarioErpComponentErpProductQuotation(
      scenarioId: UUID,
      componentProductId: Int,
      update: ScenarioErpComponentErpProductUpdate) =
    quote(
      query[ScenarioErpComponentErpProduct]
        .filter(row => row.scenarioId == lift(scenarioId) && row.componentProductId == lift(componentProductId))
        .update(_.relevance -> lift(update.relevance))
        .returning(scenarioErpComponentErpProduct => scenarioErpComponentErpProduct))
}

trait DefaultDeleteScenarioErpComponentErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.EnumEncoders._

  def deleteScenarioErpComponentErpProductAction(scenarioId: UUID, componentProductId: Int) =
    runIO(deleteScenarioErpComponentErpProductQuotation(scenarioId, componentProductId))

  def deleteScenarioErpComponentErpProductQuotation(scenarioId: UUID, componentProductId: Int) =
    quote(
      query[ScenarioErpComponentErpProduct]
        .filter(row => row.scenarioId == lift(scenarioId) && row.componentProductId == lift(componentProductId))
        .delete
        .returning(scenarioErpComponentErpProduct => scenarioErpComponentErpProduct))
}
