import {ProjectModuleType} from "../graphql/generated/globalTypes"
import {ModuleProgress, ProjectModule, ProjectModuleProgresses, ProjectModuleScore} from "../models"

interface GetModuleProgressParams {
  readonly projectModule: ProjectModule
  readonly projectModuleProgresses: ProjectModuleProgresses[]
  readonly projectModulesScores?: ProjectModuleScore[]
}

export const getModuleProgress = ({
  projectModule,
  projectModuleProgresses,
  projectModulesScores = []
}: GetModuleProgressParams): ModuleProgress => {
  const moduleData: ModuleProgress = (projectModule.moduleType === ProjectModuleType.Scenario
    ? {
        moduleId: projectModule.scenario?.id,
        name: projectModule.scenario?.name,
        status: undefined,
        moduleType: ProjectModuleType.Scenario,
        score: projectModulesScores.find(
          projectModuleScore => projectModuleScore.scenarioId === projectModule.scenarioId
        )?.score,
        maxScore: projectModulesScores.find(
          projectModuleScore => projectModuleScore.scenarioId === projectModule.scenarioId
        )?.maxScore,
        isScoringOfScenarioCompleted: projectModulesScores.find(
          projectModuleScore => projectModuleScore.scenarioId === projectModule.scenarioId
        )?.isScenarioScoringCompleted
      }
    : {
        moduleId: projectModule.questionnaire?.id,
        name: projectModule.questionnaire?.title,
        status: undefined,
        questionsCount: projectModule.questionnaire?.questions.length,
        questionsCompleted: 0,
        moduleType: ProjectModuleType.Questionnaire,
        score: projectModulesScores.find(
          projectModuleScore => projectModuleScore.questionnaireId === projectModule.questionnaireId
        )?.score,
        maxScore: projectModulesScores.find(
          projectModuleScore => projectModuleScore.questionnaireId === projectModule.questionnaireId
        )?.maxScore
      }) as ModuleProgress

  const progressElement = projectModuleProgresses.find(
    moduleProgress =>
      moduleProgress.scenarioId === moduleData.moduleId || moduleProgress.questionnaireId === moduleData.moduleId
  )
  return {
    ...moduleData,
    status: progressElement?.status,
    questionsCompleted: progressElement?.questionsInProgressCount ?? 0,
    documentsCount: progressElement?.requiredDocumentsCount ?? 0,
    documentsOpened: progressElement?.openedRequiredDocumentsCount ?? 0
  }
}
