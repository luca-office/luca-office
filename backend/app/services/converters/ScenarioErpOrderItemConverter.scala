package services.converters

import database.generated.public.ScenarioErpOrderItem
import models.ScenarioErpOrderItemCreation

object ScenarioErpOrderItemConverter {

  def toScenarioErpOrderItem(creation: ScenarioErpOrderItemCreation): ScenarioErpOrderItem =
    ScenarioErpOrderItem(
      scenarioId = creation.scenarioId,
      orderItemId = creation.orderItemId,
      sampleCompanyId = creation.sampleCompanyId,
      relevance = creation.relevance
    )
}
