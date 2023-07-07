import {ProjectModule} from "shared/models"
import {find, indexOf, Option, sortByPosition} from "shared/utils"

interface ActiveProjectModule {
  readonly activeModuleIndexZeroBased: Option<number>
  readonly activeModule: Option<ProjectModule>
}
/**
 * Get the active module by filtering the project Module Progress and mapping to project modules
 * @param surveyOption
 * @param projectModules
 * @returns
 */
export const getCurrentlyActiveProjectModuleIndexOfSurvey = (
  latestStartedModuleId: UUID | null,
  projectModules: ProjectModule[]
): ActiveProjectModule => {
  const sortedProjectModules = sortByPosition(projectModules)

  const indexOfActiveModule = indexOf(
    latestStartedModuleId,
    sortedProjectModules.map(module => module.id)
  )

  const activeModule = find<ProjectModule>(module => module.id === latestStartedModuleId, sortedProjectModules)

  const activeModuleIndexOption = Option.of(indexOfActiveModule === -1 ? undefined : indexOfActiveModule)

  return {
    activeModuleIndexZeroBased: activeModuleIndexOption,
    activeModule
  }
}
