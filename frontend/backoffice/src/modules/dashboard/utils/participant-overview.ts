import {ProjectModuleScore} from "shared/models"

export const finalScoreCount = (projectModuleScores: ProjectModuleScore[]) => {
  return projectModuleScores.filter(module => {
    if (module.questionnaireId !== null) {
      return module.score !== null
    } else if (module.scenarioId) {
      return module.isScenarioScoringCompleted === true
    } else {
      return false
    }
  }).length
}
