import {ProjectModule} from "shared/models"
import {Option} from "shared/utils"

export interface ProjectModuleManualSurvey extends ProjectModule {
  readonly startedAt: Date
}
export interface SynchronSurveyState {
  readonly activeModule: Option<ProjectModuleManualSurvey>
  readonly activeModuleIndex: Option<number>
}

export const initialSynchronSurveyState: SynchronSurveyState = {
  activeModule: Option.none(),
  activeModuleIndex: Option.none()
}
