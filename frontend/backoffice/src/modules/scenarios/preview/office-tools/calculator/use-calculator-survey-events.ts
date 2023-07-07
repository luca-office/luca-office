import {useDispatch} from "react-redux"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {CalculatorSurveyEvents} from "shared/office-tools/calculator"
import {CalculatorKey} from "shared/office-tools/calculator/enums/calculator-key"
import {addSurveyEventAction} from "shared/redux/actions/data/survey-events-action"
import {createPreviewEvent} from "../../utils"

export const useCalculatorSurveyEvents = (): CalculatorSurveyEvents => {
  const dispatch = useDispatch()

  return {
    sendCalculatorKeyPressedEvent: (key: CalculatorKey) =>
      dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.CalculatorKeyPressed, {key})))
  }
}
