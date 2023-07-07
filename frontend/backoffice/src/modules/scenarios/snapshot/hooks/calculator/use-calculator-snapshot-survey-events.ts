import {noop} from "lodash-es"
import {CalculatorSurveyEvents} from "shared/office-tools/calculator"

export const useCalculatorSnapshotSurveyEvents = (): CalculatorSurveyEvents => {
  return {
    sendCalculatorKeyPressedEvent: noop
  }
}
