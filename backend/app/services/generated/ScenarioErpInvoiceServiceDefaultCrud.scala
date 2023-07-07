package services.generated

import database.DatabaseContext
import database.generated.public.ScenarioErpInvoice
import models.{ScenarioErpInvoiceCreation, ScenarioErpInvoiceUpdate}
import services.converters.ScenarioErpInvoiceConverter.toScenarioErpInvoice

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllScenarioErpInvoice {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allScenarioErpInvoicesAction(scenarioId: UUID) =
    runIO(allScenarioErpInvoicesQuotation(scenarioId))

  def allScenarioErpInvoicesQuotation(scenarioId: UUID) =
    quote(query[ScenarioErpInvoice].filter(_.scenarioId == lift(scenarioId)))
}

trait DefaultFindScenarioErpInvoice {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findScenarioErpInvoiceAction(scenarioId: UUID, invoiceId: Int) =
    runIO(findScenarioErpInvoiceQuotation(scenarioId, invoiceId)).map(_.headOption)

  def findScenarioErpInvoiceQuotation(scenarioId: UUID, invoiceId: Int) =
    quote(
      query[ScenarioErpInvoice]
        .filter(row => row.scenarioId == lift(scenarioId) && row.invoiceId == lift(invoiceId)))
}

trait DefaultCreateScenarioErpInvoice {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createScenarioErpInvoiceAction(creation: ScenarioErpInvoiceCreation) =
    runIO(createScenarioErpInvoiceQuotation(creation))

  def createScenarioErpInvoiceQuotation(creation: ScenarioErpInvoiceCreation) =
    quote(
      query[ScenarioErpInvoice]
        .insert(lift(toScenarioErpInvoice(creation)))
        .returning(scenarioErpInvoice => scenarioErpInvoice))
}

trait DefaultUpdateScenarioErpInvoice {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateScenarioErpInvoiceAction(scenarioId: UUID, invoiceId: Int, update: ScenarioErpInvoiceUpdate) =
    runIO(updateScenarioErpInvoiceQuotation(scenarioId, invoiceId, update))

  def updateScenarioErpInvoiceQuotation(scenarioId: UUID, invoiceId: Int, update: ScenarioErpInvoiceUpdate) =
    quote(
      query[ScenarioErpInvoice]
        .filter(row => row.scenarioId == lift(scenarioId) && row.invoiceId == lift(invoiceId))
        .update(_.relevance -> lift(update.relevance))
        .returning(scenarioErpInvoice => scenarioErpInvoice))
}

trait DefaultDeleteScenarioErpInvoice {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.EnumEncoders._

  def deleteScenarioErpInvoiceAction(scenarioId: UUID, invoiceId: Int) =
    runIO(deleteScenarioErpInvoiceQuotation(scenarioId, invoiceId))

  def deleteScenarioErpInvoiceQuotation(scenarioId: UUID, invoiceId: Int) =
    quote(
      query[ScenarioErpInvoice]
        .filter(row => row.scenarioId == lift(scenarioId) && row.invoiceId == lift(invoiceId))
        .delete
        .returning(scenarioErpInvoice => scenarioErpInvoice))
}
