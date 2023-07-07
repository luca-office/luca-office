package services.converters

import database.generated.public.ScenarioErpSupplier
import models.ScenarioErpSupplierCreation

object ScenarioErpSupplierConverter {

  def toScenarioErpSupplier(creation: ScenarioErpSupplierCreation): ScenarioErpSupplier =
    ScenarioErpSupplier(
      scenarioId = creation.scenarioId,
      supplierId = creation.supplierId,
      sampleCompanyId = creation.sampleCompanyId,
      relevance = creation.relevance
    )
}
