import {OfficeModule, ProjectModule} from "shared/models"

export const toOfficeModule = (module: ProjectModule): OfficeModule => ({
  id: module.id,
  moduleType: module.moduleType,
  position: module.position,
  projectId: module.projectId,
  questionnaireId: module.questionnaireId,
  scenarioId: module.scenarioId
})
