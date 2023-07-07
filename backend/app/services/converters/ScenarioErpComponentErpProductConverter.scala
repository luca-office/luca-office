package services.converters

import database.generated.public.ScenarioErpComponentErpProduct
import models.ScenarioErpComponentErpProductCreation

object ScenarioErpComponentErpProductConverter {

  def toScenarioErpComponentErpProduct(
      creation: ScenarioErpComponentErpProductCreation): ScenarioErpComponentErpProduct =
    ScenarioErpComponentErpProduct(
      scenarioId = creation.scenarioId,
      componentProductId = creation.componentProductId,
      sampleCompanyId = creation.sampleCompanyId,
      relevance = creation.relevance
    )
}
