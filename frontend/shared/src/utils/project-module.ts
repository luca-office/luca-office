import {IconName} from "../enums"
import {ProjectModuleType} from "../graphql/generated/globalTypes"
import {ProjectModule, ProjectModuleScore, SurveyResultsForParticipant} from "../models"
import {LucaI18nLangKey} from "../translations"

export const getProjectModuleIcon = (moduleType: ProjectModuleType): IconName => {
  switch (moduleType) {
    case ProjectModuleType.Questionnaire:
      return IconName.Questionnaire
    case ProjectModuleType.Scenario:
      return IconName.Monitor
    default:
      return IconName.Close
  }
}

export const getProjectModuleTitle = (module: ProjectModule): string => {
  switch (module.moduleType) {
    case ProjectModuleType.Questionnaire:
      return module.questionnaire?.title ?? ""
    case ProjectModuleType.Scenario:
      return module.scenario?.name ?? ""
    default:
      return ""
  }
}

export const getProjectModuleTranslationKey = (moduleType: ProjectModuleType): LucaI18nLangKey => {
  switch (moduleType) {
    case ProjectModuleType.Questionnaire:
      return "questionnaire__title"
    case ProjectModuleType.Scenario:
      return "scenario_title"
    default:
      return "element__unknown"
  }
}

export const getProjectModuleScores = (
  surveyResultsForParticipant: SurveyResultsForParticipant
): ProjectModuleScore[] =>
  surveyResultsForParticipant.projectModuleScores.map(module => {
    return {
      score: module.score,
      maxScore: module.maximumScore,
      questionnaireId: module.__typename === "QuestionnaireScore" ? module.questionnaireId : null,
      scenarioId: module.__typename === "ScenarioScore" ? module.scenarioId : null,
      isScenarioScoringCompleted: module.__typename === "ScenarioScore" ? module.isComplete : false
    }
  })
