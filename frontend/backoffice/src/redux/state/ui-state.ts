import {CommonUiState, initialCommonUiState} from "./ui/common-ui-state"
import {initialProjectState, ProjectsState} from "./ui/projects-state"
import {initialScenariosState, ScenariosState} from "./ui/scenarios-state"
import {initialSynchronSurveyState, SynchronSurveyState} from "./ui/synchron-survey-state"

export interface UiState {
  readonly common: CommonUiState
  readonly projects: ProjectsState
  readonly scenarios: ScenariosState
  readonly synchronSurvey: SynchronSurveyState
}

export const initialUiState: UiState = {
  common: initialCommonUiState,
  projects: initialProjectState,
  scenarios: initialScenariosState,
  synchronSurvey: initialSynchronSurveyState
}
