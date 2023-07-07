package models

import enums.ProjectModuleType

import java.util.UUID

case class ProjectModuleCreation(
    projectId: UUID,
    moduleType: ProjectModuleType,
    scenarioId: Option[UUID],
    questionnaireId: Option[UUID]
)
