package services.converters

import database.generated.public.ScenarioErpOrder
import models.ScenarioErpOrderCreation

object ScenarioErpOrderConverter {

  def toScenarioErpOrder(creation: ScenarioErpOrderCreation): ScenarioErpOrder =
    ScenarioErpOrder(
      scenarioId = creation.scenarioId,
      orderId = creation.orderId,
      sampleCompanyId = creation.sampleCompanyId,
      relevance = creation.relevance
    )
}
