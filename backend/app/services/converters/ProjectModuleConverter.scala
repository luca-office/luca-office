package services.converters

import database.generated.public.ProjectModule
import models.ProjectModuleCreation

import java.util.UUID

object ProjectModuleConverter {

  def toProjectModule(creation: ProjectModuleCreation, position: BigDecimal): ProjectModule =
    ProjectModule(
      id = UUID.randomUUID(),
      projectId = creation.projectId,
      moduleType = creation.moduleType,
      scenarioId = creation.scenarioId,
      questionnaireId = creation.questionnaireId,
      position = position
    )
}
