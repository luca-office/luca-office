package services.converters

import database.generated.public.ScenarioErpProduct
import models.ScenarioErpProductCreation

object ScenarioErpProductConverter {

  def toScenarioErpProduct(creation: ScenarioErpProductCreation): ScenarioErpProduct =
    ScenarioErpProduct(
      scenarioId = creation.scenarioId,
      productId = creation.productId,
      sampleCompanyId = creation.sampleCompanyId,
      relevance = creation.relevance
    )
}
