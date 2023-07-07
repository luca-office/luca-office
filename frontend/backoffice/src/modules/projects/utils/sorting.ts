import {pick} from "lodash-es"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {ProjectModule} from "shared/models"
import {ResortableEntity} from "../../../models"

/**
 * Helper to convert modules for sort overlay
 * @param modules - project modules
 */
export const convertModulesToSortables = (modules: ProjectModule[]): ResortableEntity[] =>
  modules.map(
    module =>
      ({
        ...pick(module, "id", "position", "moduleType", "scenario", "questionnaire"),
        title:
          module.moduleType === ProjectModuleType.Questionnaire ? module.questionnaire?.title : module.scenario?.name
      } as ResortableEntity)
  )
