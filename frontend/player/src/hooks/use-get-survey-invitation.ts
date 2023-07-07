import {useSelector} from "react-redux"
import {SurveyInvitationState} from "shared/redux/state/data"
import {AppState} from "../redux/state/app-state"

export const useGetSurveyInvitationFromRedux = () => {
  const surveyInvitation = useSelector<AppState, SurveyInvitationState>(state => state.data.surveyInvitation)

  return {
    invitationIdOption: surveyInvitation.invitationId,
    surveyIdOption: surveyInvitation.surveyId,
    tokenOption: surveyInvitation.token,
    executionTypeOption: surveyInvitation.executionType
  }
}
