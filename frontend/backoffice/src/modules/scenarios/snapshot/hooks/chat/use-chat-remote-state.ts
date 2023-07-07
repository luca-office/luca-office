import {useSurveyInvitations} from "shared/graphql/hooks"
import {SurveyInvitationLight} from "shared/models"

export interface ChatRemoteState {
  surveyInvitations: SurveyInvitationLight[]
}

export const useChatRemoteState = (surveyId: UUID): ChatRemoteState => {
  const {surveyInvitations} = useSurveyInvitations(surveyId, !surveyId)

  return {
    surveyInvitations
  }
}
