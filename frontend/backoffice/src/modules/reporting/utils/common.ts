import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {ProjectModule, ProjectModuleResult} from "shared/models"
import {isDefined} from "shared/utils"

export const getFinishedModulesCount = (projectModuleResults: ProjectModuleResult[]) =>
  projectModuleResults.filter(projectModule => projectModule.isComplete).length

export const scenarioOrQuestionnaireForProjectModuleId = (
  questionnaireId: UUID | null | undefined,
  scenarioId: UUID | null | undefined,
  projectModules: ProjectModule[]
) => {
  if (isDefined(questionnaireId)) {
    return projectModules
      .filter(module => module.moduleType === ProjectModuleType.Questionnaire)
      .find(module => module.questionnaireId === questionnaireId)?.questionnaire
  } else if (isDefined(scenarioId)) {
    return projectModules
      .filter(module => module.moduleType === ProjectModuleType.Scenario)
      .find(module => module.scenarioId === scenarioId)?.scenario
  } else {
    return undefined
  }
}

export const titleForProjectModuleId = (
  questionnaireId: UUID | null,
  scenarioId: UUID | null,
  projectModules: ProjectModule[]
) => {
  const scenarioOrQuestionnaire = scenarioOrQuestionnaireForProjectModuleId(questionnaireId, scenarioId, projectModules)

  return scenarioOrQuestionnaire?.__typename === "Questionnaire"
    ? scenarioOrQuestionnaire.title
    : scenarioOrQuestionnaire?.__typename === "Scenario"
    ? scenarioOrQuestionnaire?.name
    : undefined
}
