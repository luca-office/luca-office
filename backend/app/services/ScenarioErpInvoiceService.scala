package services

import database.DatabaseContext
import database.generated.public.ScenarioErpInvoice
import models.{ScenarioErpInvoiceCreation, ScenarioErpInvoiceUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioErpInvoiceService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllScenarioErpInvoice
    with DefaultFindScenarioErpInvoice
    with DefaultCreateScenarioErpInvoice
    with DefaultUpdateScenarioErpInvoice
    with DefaultDeleteScenarioErpInvoice {
  val context = databaseContext

  import context._

  def all(scenarioId: UUID): Future[Seq[ScenarioErpInvoice]] =
    performIO(allScenarioErpInvoicesAction(scenarioId))

  def create(creation: ScenarioErpInvoiceCreation): Future[ScenarioErpInvoice] =
    performIO(createScenarioErpInvoiceAction(creation))
      .recover(defaultErrorHandler)

  def update(scenarioId: UUID, invoiceId: Int, update: ScenarioErpInvoiceUpdate): Future[ScenarioErpInvoice] =
    performIO(updateScenarioErpInvoiceAction(scenarioId, invoiceId, update))
      .recover(defaultErrorHandler)

  def delete(scenarioId: UUID, invoiceId: Int): Future[ScenarioErpInvoice] =
    performIO(deleteScenarioErpInvoiceAction(scenarioId, invoiceId))
}
