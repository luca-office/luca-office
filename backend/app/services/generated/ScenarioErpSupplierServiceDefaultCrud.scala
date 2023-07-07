package services.generated

import database.DatabaseContext
import database.generated.public.ScenarioErpSupplier
import models.{ScenarioErpSupplierCreation, ScenarioErpSupplierUpdate}
import services.converters.ScenarioErpSupplierConverter.toScenarioErpSupplier

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllScenarioErpSupplier {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allScenarioErpSuppliersAction(scenarioId: UUID) =
    runIO(allScenarioErpSuppliersQuotation(scenarioId))

  def allScenarioErpSuppliersQuotation(scenarioId: UUID) =
    quote(query[ScenarioErpSupplier].filter(_.scenarioId == lift(scenarioId)))
}

trait DefaultFindScenarioErpSupplier {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findScenarioErpSupplierAction(scenarioId: UUID, supplierId: Int) =
    runIO(findScenarioErpSupplierQuotation(scenarioId, supplierId)).map(_.headOption)

  def findScenarioErpSupplierQuotation(scenarioId: UUID, supplierId: Int) =
    quote(
      query[ScenarioErpSupplier]
        .filter(row => row.scenarioId == lift(scenarioId) && row.supplierId == lift(supplierId)))
}

trait DefaultCreateScenarioErpSupplier {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createScenarioErpSupplierAction(creation: ScenarioErpSupplierCreation) =
    runIO(createScenarioErpSupplierQuotation(creation))

  def createScenarioErpSupplierQuotation(creation: ScenarioErpSupplierCreation) =
    quote(
      query[ScenarioErpSupplier]
        .insert(lift(toScenarioErpSupplier(creation)))
        .returning(scenarioErpSupplier => scenarioErpSupplier))
}

trait DefaultUpdateScenarioErpSupplier {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateScenarioErpSupplierAction(scenarioId: UUID, supplierId: Int, update: ScenarioErpSupplierUpdate) =
    runIO(updateScenarioErpSupplierQuotation(scenarioId, supplierId, update))

  def updateScenarioErpSupplierQuotation(scenarioId: UUID, supplierId: Int, update: ScenarioErpSupplierUpdate) =
    quote(
      query[ScenarioErpSupplier]
        .filter(row => row.scenarioId == lift(scenarioId) && row.supplierId == lift(supplierId))
        .update(_.relevance -> lift(update.relevance))
        .returning(scenarioErpSupplier => scenarioErpSupplier))
}

trait DefaultDeleteScenarioErpSupplier {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.EnumEncoders._

  def deleteScenarioErpSupplierAction(scenarioId: UUID, supplierId: Int) =
    runIO(deleteScenarioErpSupplierQuotation(scenarioId, supplierId))

  def deleteScenarioErpSupplierQuotation(scenarioId: UUID, supplierId: Int) =
    quote(
      query[ScenarioErpSupplier]
        .filter(row => row.scenarioId == lift(scenarioId) && row.supplierId == lift(supplierId))
        .delete
        .returning(scenarioErpSupplier => scenarioErpSupplier))
}
