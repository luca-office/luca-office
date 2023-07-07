import {SurveyEventType} from "../../../graphql/generated/globalTypes"
import {SurveyEvent} from "../../../models"
import {SharedAppState} from "../../../redux/state"
import {CommonUiState} from "../../../redux/state/ui"
import {Option} from "../../../utils"

export const commonUiSnapshotReducer = (state: SharedAppState, surveyEvent: SurveyEvent): CommonUiState => {
  const common = state.ui.common

  switch (surveyEvent.eventType) {
    case SurveyEventType.StartScenario: {
      return {
        ...common,
        activeModuleStartTime: Option.of(surveyEvent.timestamp)
      }
    }
    case SurveyEventType.ViewReferenceBookArticle:
    case SurveyEventType.ViewReferenceBookChapter: {
      const data = surveyEvent.data as {scenarioId: UUID; elementId: UUID}
      return {
        ...common,
        selectedReferenceElementId: Option.of(data.elementId)
      }
    }
    default:
      return common
  }
}
