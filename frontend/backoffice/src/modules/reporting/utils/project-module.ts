import {ProjectModule, SurveyResultsOverview} from "shared/models"
import {find, first, Option} from "shared/utils"

export const getFirstProjectModuleFromSurveyResultsOverview = (
  projectModules: ProjectModule[],
  surveyResultsOverview: SurveyResultsOverview
): Option<ProjectModule> => {
  const {scenarioId, questionnaireId} = first(surveyResultsOverview.projectModuleResults)
    .map(projectModuleResult => ({
      scenarioId: projectModuleResult.scenarioId,
      questionnaireId: projectModuleResult.questionnaireId
    }))
    .getOrElse({scenarioId: null, questionnaireId: null})

  return find(
    projectModule =>
      scenarioId !== null
        ? projectModule.scenarioId === scenarioId
        : questionnaireId !== null
        ? projectModule.questionnaireId === questionnaireId
        : false,
    projectModules
  )
}
