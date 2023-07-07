import {ProjectModuleResult} from "shared/models"

export const getFinishedModulesCount = (projectModuleResults: ProjectModuleResult[]) =>
  projectModuleResults.filter(projectModule => projectModule.isComplete).length
