package services.converters

import database.generated.public.ScenarioSampleCompanyFile
import models.ScenarioSampleCompanyFileCreation

object ScenarioSampleCompanyFileConverter {

  def toScenarioSampleCompanyFile(creation: ScenarioSampleCompanyFileCreation): ScenarioSampleCompanyFile =
    ScenarioSampleCompanyFile(
      scenarioId = creation.scenarioId,
      fileId = creation.fileId,
      relevance = creation.relevance)
}
