package services.converters

import database.generated.public.ScenarioErpEmployee
import models.ScenarioErpEmployeeCreation

object ScenarioErpEmployeeConverter {

  def toScenarioErpEmployee(creation: ScenarioErpEmployeeCreation): ScenarioErpEmployee =
    ScenarioErpEmployee(
      scenarioId = creation.scenarioId,
      employeeId = creation.employeeId,
      sampleCompanyId = creation.sampleCompanyId,
      relevance = creation.relevance
    )
}
