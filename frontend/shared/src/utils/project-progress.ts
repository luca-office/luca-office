import {ProjectProgressType} from "../enums"
import {ProjectModuleProgressType} from "../graphql/generated/globalTypes"
import {ModuleProgress, ProjectModuleScore} from "../models"

export const getProjectProgress = (
  moduleProgress: ModuleProgress[] = [],
  moduleScores: ProjectModuleScore[]
): ProjectProgressType => {
  if (moduleProgress.length === 0 || moduleProgress.every(progress => progress.status === undefined))
    return ProjectProgressType.NotStarted
  else if (!moduleProgress.every(progress => progress.status === ProjectModuleProgressType.Completed))
    return ProjectProgressType.SurveyInProgress
  else {
    if (moduleScores.every(isFinalScoreOfModuleSet)) return ProjectProgressType.RatingCompleted
    return moduleScores.some(module => module.score !== 0)
      ? ProjectProgressType.RatingInProgress
      : ProjectProgressType.SurveyFinished
  }
}

const isFinalScoreOfModuleSet = (projectModuleScore: ProjectModuleScore) => {
  if (projectModuleScore.questionnaireId !== null) {
    return projectModuleScore.score !== null
  } else if (projectModuleScore.scenarioId !== null) {
    return projectModuleScore.isScenarioScoringCompleted === true
  } else {
    return false
  }
}
