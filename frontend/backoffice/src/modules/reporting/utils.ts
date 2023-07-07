import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {ProjectModule, Questionnaire, Scenario} from "shared/models"

export type ScenarioModule = Pick<ProjectModule, "projectId" | "id" | "position" | "__typename"> & {
  readonly moduleType: ProjectModuleType.Scenario
  readonly scenarioId: UUID
  readonly scenario: Scenario
  readonly questionnaireId: null
  readonly questionnaire: null
}

export type QuestionnaireModule = Pick<ProjectModule, "projectId" | "id" | "position" | "__typename"> & {
  readonly moduleType: ProjectModuleType.Questionnaire
  readonly scenarioId: null
  readonly scenario: null
  readonly questionnaireId: UUID
  readonly questionnaire: Questionnaire
}

export const isScenario = (projectModule?: ProjectModule): projectModule is ScenarioModule => {
  return projectModule?.moduleType === ProjectModuleType.Scenario
}

export const isQuestionnaire = (projectModule?: ProjectModule): projectModule is QuestionnaireModule => {
  return projectModule?.moduleType === ProjectModuleType.Questionnaire
}
