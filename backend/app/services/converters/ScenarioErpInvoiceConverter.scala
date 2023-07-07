package services.converters

import database.generated.public.ScenarioErpInvoice
import models.ScenarioErpInvoiceCreation

object ScenarioErpInvoiceConverter {

  def toScenarioErpInvoice(creation: ScenarioErpInvoiceCreation): ScenarioErpInvoice =
    ScenarioErpInvoice(
      scenarioId = creation.scenarioId,
      invoiceId = creation.invoiceId,
      sampleCompanyId = creation.sampleCompanyId,
      relevance = creation.relevance
    )
}
