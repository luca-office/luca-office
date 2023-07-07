import {SurveyEvent} from "../../../models"
import {SharedAppState} from "../../../redux/state"
import {dataSnapshotReducer} from "./data-snapshot-reducer"
import {uiSnapshotReducer} from "./ui-snapshot-reducer"

export const scenarioSnapshotReducer = (state: SharedAppState, surveyEvent: SurveyEvent): SharedAppState => {
  return {
    data: dataSnapshotReducer(state, surveyEvent),
    ui: uiSnapshotReducer(state, surveyEvent)
  }
}
