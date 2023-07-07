import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {Project, ProjectModule} from "shared/models"
import {Option} from "shared/utils"

/**
 * once a survey has been added, a project is finalized
 * this means no modules in edit state can be added anymore
 * @param project
 */
export const checkIsProjectFinalized = (project: Option<Project>) =>
  project.map(projectData => projectData.surveys.filter(survey => !survey.isTestSurvey).length > 0).getOrElse(false)

/**
 *
 * @param module Project Module
 */
export const checkIsProjectModuleEditable = (module: ProjectModule) =>
  (module.moduleType === ProjectModuleType.Scenario &&
    module.scenario &&
    !module.scenario.finalizedAt &&
    !module.scenario.publishedAt) ||
  (module.moduleType === ProjectModuleType.Questionnaire &&
    module.questionnaire &&
    !module.questionnaire.finalizedAt &&
    !module.questionnaire.publishedAt)
