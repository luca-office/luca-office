package services.converters

import database.generated.public.ScenarioErpComponent
import models.ScenarioErpComponentCreation

object ScenarioErpComponentConverter {

  def toScenarioErpComponent(creation: ScenarioErpComponentCreation): ScenarioErpComponent =
    ScenarioErpComponent(
      scenarioId = creation.scenarioId,
      componentId = creation.componentId,
      sampleCompanyId = creation.sampleCompanyId,
      relevance = creation.relevance
    )
}
