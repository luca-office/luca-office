import {CalculatorSurveyEvents} from "shared/office-tools/calculator"
import {CalculatorKey} from "shared/office-tools/calculator/enums/calculator-key"
import {sendCalculatorKeyPressedEvent} from "shared/utils"
import {useGetSurveyInvitationFromRedux} from "../../../hooks/use-get-survey-invitation"

export const useCalculatorSurveyEvents = (scenarioId: UUID): CalculatorSurveyEvents => {
  const {invitationIdOption, surveyIdOption} = useGetSurveyInvitationFromRedux()

  return {
    sendCalculatorKeyPressedEvent: (key: CalculatorKey) =>
      invitationIdOption.forEach(invitationId =>
        surveyIdOption.forEach(surveyId => sendCalculatorKeyPressedEvent(scenarioId, key)(surveyId, invitationId))
      )
  }
}
