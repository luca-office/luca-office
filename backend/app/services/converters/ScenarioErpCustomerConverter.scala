package services.converters

import database.generated.public.ScenarioErpCustomer
import models.ScenarioErpCustomerCreation

object ScenarioErpCustomerConverter {

  def toScenarioErpCustomer(creation: ScenarioErpCustomerCreation): ScenarioErpCustomer =
    ScenarioErpCustomer(
      scenarioId = creation.scenarioId,
      customerId = creation.customerId,
      sampleCompanyId = creation.sampleCompanyId,
      relevance = creation.relevance
    )
}
